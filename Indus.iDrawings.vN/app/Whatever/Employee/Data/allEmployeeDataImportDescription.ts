import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { EmployeeDataExportDemo } from './employeeDataExportDemo';
import { ActivatedRoute } from '@angular/router';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'

@Component({
    selector: 'import-employee-data-desc',
    templateUrl: './app/Views/Employee/Data/allEmployeeDataImportDescription.html',
    directives: [SplitViewComponent]
})

export class ImportEmployeeDataDesc implements OnInit {
	public baseUrl: string;

    ngOnInit() {
        this.baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
    }

}