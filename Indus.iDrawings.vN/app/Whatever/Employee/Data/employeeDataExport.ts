import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { EmployeeDataExportDemo } from './employeeDataExportDemo';
import { ActivatedRoute } from '@angular/router';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'

@Component({
    selector: 'export-employee-data',
    templateUrl: './app/Views/Employee/Data/employeeDataExport.html',
    directives: [EmployeeDataExportDemo, SplitViewComponent],
    inputs: ['exportClick'],
})

export class ExportEmployeeData implements OnInit {
    public baseUrl: string;
    splitviewExportExtApp: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 }
    splitViewTitle = 'Employee Data';

    constructor(private _activtdRoute : ActivatedRoute){}
    ngOnInit() {
        this.baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
    }
    exportClick() {
        this.splitviewExportExtApp.showSecondaryView = true;
    }
}

