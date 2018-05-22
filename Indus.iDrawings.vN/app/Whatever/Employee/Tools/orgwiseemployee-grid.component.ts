import {Component, Output, EventEmitter, AfterViewInit,OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'

import {EmployeeService} from '../../../Models/Employee/employee.services';

@Component({
    selector: 'orgwiseemp-grid',
    templateUrl: './app/Views/Employee/Tools/orgwiseemployee-grid.component.html',
    directives: [GridComponent],
    providers: [HTTP_PROVIDERS, EmployeeService],
    inputs: ['itemsSource','target']

})

export class OrgWiseEmpGridComponent {
    fieldObject: IField[];
    orgDetailsObj: any[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "EmployeeId", allowAdd: false, allowEdit: false, allowSort:false };
  

    constructor(private empService: EmployeeService) {

    }
    ngOnInit() {
      
        var contextObj = this;
        contextObj.empService.getOrgWiseEmpListField().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
        var orgDetails = contextObj.orgDetailsObj;
       
    }
    
}