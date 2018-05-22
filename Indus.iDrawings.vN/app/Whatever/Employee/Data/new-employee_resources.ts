import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { EmployeeService } from '../../../Models/Employee/employee.services'
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';

@Component({

    selector: 'new-employee_resources',
    templateUrl: 'app/Views/Employee/Data/new-employee_resources.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, EmployeeService, NotificationService, GeneralFunctions],
    inputs: ['target', 'employeeId', 'filterResourceChkbx', 'assigned']
})

export class NewResourcesComponent implements AfterViewInit {
    target: number;
    employeeId: number;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    errorMessage: string;
    fieldObject: IField[];
    itemsSource: any[];
    assigned: any;
    filterByEmployeeLocation: any;
    ddlResourceCategory: any;
    ddlResourceType: any;
    objectCategoryId: any;
    resourceTypeId: any;
    alignContent: string;
    filterResourceChkbx: boolean;
    isSubscribed: boolean = true;
    isFilterLocation: boolean = false;
    isDdlResourceTypeLoaded: boolean = false;
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngAfterViewInit() {  
        var contextObj = this;
        this.alignContent = "horizontal";        
        this.employeeService.getEmployeeNewResourceColumnData().subscribe(function (resultData) {
            contextObj.filterByEmployeeLocation = resultData["Data"].find(function (el) { return el.ReportFieldId === 7413; });
            //if (contextObj.assigned == "Yes") {
            //    contextObj.filterByEmployeeLocation["FieldValue"] = true;
            //} else {
            //    contextObj.filterByEmployeeLocation["FieldValue"] = false;
            //}
            contextObj.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    if (contextObj.assigned == "Yes") {
                        contextObj.filterByEmployeeLocation["FieldValue"] = true;
                        contextObj.filterByEmployeeLocation["IsVisible"] = false;
                        contextObj.isSubscribed = false;
                    }
                } else {
                    if (contextObj.assigned == "Yes") {
                        contextObj.filterByEmployeeLocation["FieldValue"] = true;
                    } else {
                        contextObj.filterByEmployeeLocation["FieldValue"] = false;
                    }
                }
            });  
            contextObj.ddlResourceCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 283; });
            contextObj.ddlResourceType = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
            var removeArr = [7413, 283, 647];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
        });             
    }

    onChangeResourceCategory(event: any) {
        this.objectCategoryId = event;
        var contextObj = this;
        if (this.objectCategoryId > -1) {
            if ((this.filterByEmployeeLocation.FieldValue == true) && (this.filterResourceChkbx == true)) {
                this.employeeService.getResourceTypeFilterByEmployeeLocation(this.objectCategoryId, this.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                        }
                    }
                    else {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                            contextObj.notificationService.ShowToaster("No Resource Types exist", 2);
                        }
                    }
                });

                this.isDdlResourceTypeLoaded = true;
            }
            else {
                this.employeeService.getResourceType(this.objectCategoryId, this.target).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                        }
                        else {
                            if (contextObj.ddlResourceType["FieldId"] == 775) {
                                contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                                contextObj.ddlResourceType["FieldValue"] = "-1";
                                contextObj.notificationService.ShowToaster("No Resource Types exist", 2);
                            }
                        }
                    }
                });
                this.isDdlResourceTypeLoaded = true;
            }
        } else {
            this.ddlResourceType["FieldValue"] = "-1";
            this.ddlResourceType["LookupDetails"]["LookupValues"] = [];
            this.itemsSource = [];
        }
        
    }

    onChangeResourceType(event: any) {
        this.resourceTypeId = event;
        var contextObj = this;
        if (this.resourceTypeId > -1) {
            this.onDataLoad();
        }
        else {
            this.itemsSource = [];
        }
    }

    filterByEmployeeLocationChange(event: any) {
        var contextObj = this;
        contextObj.isFilterLocation = event.IsChecked;
    }

    public onDataLoad() {
        var contextObj = this;
        if (this.isDdlResourceTypeLoaded == true) {
            if (this.filterByEmployeeLocation.FieldValue == true) {
                this.employeeService.getEmployeeNewResourceByLocationData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.resourceTypeId, contextObj.employeeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.itemsSource = null;
                    }
                })
            }
            else {
                this.employeeService.getEmployeeNewResourceData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.target, contextObj.objectCategoryId, contextObj.resourceTypeId, contextObj.employeeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.itemsSource = null;
                    }
                })
            }
        }
    }

    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.onDataLoad();
    }   

    insertEmployeeResourcesList(event: any) {
        var contextObj = this;
        var hasSelectedIds: boolean = false;
        var arrayList = new Array<ReportFieldArray>();
        if (this.filterByEmployeeLocation.FieldValue == true) {
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 865,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                this.employeeService.postSubmitActionEmployeeRsource(JSON.stringify(arrayList), contextObj.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Resource added", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                    }
                })
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Resource", 2);
            }
        }
        else {      
            hasSelectedIds = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 865,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                this.employeeService.postSubmitActionEmployeeRsource(JSON.stringify(arrayList), contextObj.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Resource added", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                    }
                })
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Resource", 2);
            }
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}