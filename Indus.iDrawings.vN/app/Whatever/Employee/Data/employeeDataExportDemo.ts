import {Component, OnInit} from '@angular/core';
import { EmployeeService } from '../../../Models/Employee/employee.services';

@Component({
	selector: 'demo-employee-export',
	templateUrl : './app/Views/Employee/Data/EmployeeDataExportDemo.html',
	providers : [EmployeeService]
})
export class EmployeeDataExportDemo implements OnInit
{
	baseUrl : string;
	employeeDataList: string;
	dataDescription=[];
	gridColumnNames = [];
	constructor(private _empDataList : EmployeeService){}
		ngOnInit() {
			this.baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
			//this.employeeDataList = this._empDataList.getapiAllEmployeeDataExport();
		}

		onInvokeApi(){
			var currContext = this;
			 currContext._empDataList.getSessionData().subscribe(function (resultUserData) {
				 var sessionData = resultUserData["Data"];
				 currContext._empDataList.getApiAllEmployeeDataExport(sessionData["CustomerId"], sessionData["UserId"], sessionData["TimeOffset"]).subscribe(function (resultData) {
				 currContext.employeeDataList = JSON.stringify(resultData.Data);
				 currContext.dataDescription=resultData.DataDescription;				 
				 /*
				 if( resultData.Data.length >0 ) {
					for(var col in resultData.Data[0]){
						if(col.toLowerCase().lastIndexOf('id') != -1)
						console.log(col);
					}
				 
				 }
				 */
				   });
			});
		}

}