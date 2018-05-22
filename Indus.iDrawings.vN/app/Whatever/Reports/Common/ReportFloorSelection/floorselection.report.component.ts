import { Component, Output, EventEmitter, AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../../Framework/Models/Interface/IField'
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { TreeView } from '../../../../Framework/Whatever/TreeView/treeview.component';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { Directory } from '../../../../Framework/Whatever/TreeView/directory.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import {EmployeeService} from '../../../../models/employee/employee.services'

@Component({
    selector: 'floorselectionreport',
    templateUrl: './app/Views/Reports/Common/ReportFloorSelection/floorselection.report.component.html',
    directives: [GridComponent, SlideComponent, TreeView, PageComponent,SubMenu],
    providers: [CommonReportService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, EmployeeService],
    inputs: ['Criteria', 'ReportCategoryId','objectCategoryId','additionalReportName']
})

export class FloorSelectionReportComponent implements AfterViewInit {
    FieldTable: any;
    clmFieldTable: any;
    Criteria: number;
    ReportCategoryId: number;
    Ids: string;
    pagePath: string = "";
    @Output() selectedIds = new EventEmitter();
    menuData: any;
    iscard = true;
    enableMenu: any[];
    isChanged: boolean = undefined;
    objectCategoryId: number = 1;
    objectCategoryName: any;
    additionalReportName: string = "";
    
    constructor(private reportService: CommonReportService, private notificationService: NotificationService, private generFun: GeneralFunctions, private employeeService: EmployeeService) {

    }

    ngOnInit() {
        
        switch (this.objectCategoryId) {
            case 1: this.objectCategoryName = "Assets";
                break;
            case 2: this.objectCategoryName = "Furniture";
                break;
            case 3: this.objectCategoryName = "Object"; //Telecom
                break;
            case 8: this.objectCategoryName = "Component"; //Electric
                break;
            case 9: this.objectCategoryName = "Component"; //Fire and Safety
                break;
            case 10: this.objectCategoryName = "Component"; //Mechanical
                break;
        }

        switch (this.ReportCategoryId)
        {
            case 89: this.pagePath = "Reports / Space / Gross Area Distribution";
                break;
            case 90: this.pagePath = "Reports / Space / Gross Area Organizational Distribution";
                break;
            case 91: this.pagePath = "Reports / Space / Net Area Distribution";
                break;
            case 92: this.pagePath = "Reports / Space / Net Area Organizational Distribution";
                break;
            case 226: this.pagePath = "Reports / Space / Gross Area Report";
                break;
            case 17: this.pagePath = "Reports / Space / Space Details";
                break;
            case 100: this.pagePath = "Reports / Employees / Detailed Occupancy";
                break;
            case 101: this.pagePath = "Reports / Employees / Under Occupied Spaces";
                break;
            case 102: this.pagePath = "Reports / Employees / Over Occupied Spaces";
                break;
            case 103: this.pagePath = "Reports / Employees / Nominally Occupied ";
                break;
            case 326: this.pagePath = "Reports / Employees / Occupancy Distribution";
                break;
            case 99: this.pagePath = "Reports / Employees / Square Foot Analysis";
                break;
            case 48: this.pagePath = "Reports / Employees / Assigned Employees";
                break;
            case 108: this.pagePath = "Reports / CAI / CAI Space Driver";
                break;
            case 107:
                if (this.objectCategoryId == 3)
                    this.pagePath = "Reports / Telecom" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 8)
                    this.pagePath = "Reports / Electrical" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 9)
                    this.pagePath = "Reports / Fire and Safety" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 10)
                    this.pagePath = "Reports / Mechanical" + " / " + this.objectCategoryName + " List by Floor";
                else
                    this.pagePath = "Reports / " + this.objectCategoryName + " / " + this.objectCategoryName + " List by Floor";
                break;
            default:               
                if (this.ReportCategoryId >= 1000)
                    this.pagePath = "Reports / Space / Additional Reports - " + this.additionalReportName;
                else
                    this.pagePath = " ";
                break;
        }

        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
      


    }



    ngAfterViewInit() {
        var contextObj = this;
        contextObj.loadData(contextObj);
    }

    public onSubMenuChange(event: any) {
        this.isChanged = !this.isChanged;
    }
    private loadData(contextObj) {
        var id = 0;
        var moduleIdEmp = 5;

        //var objectCategoryId = 1; /* assets */
             
        switch (this.ReportCategoryId) {

            case 100: id = 25;
                break;
            case 326: id = 25;
                break;
            case 101: id = 26;
                break;
            case 102: id = 27;
                break;
            case 103: id = 28;
                break;
            default: id = 0;
                break;
        }
       

        if (this.ReportCategoryId == 89 || this.ReportCategoryId == 226 || this.ReportCategoryId == 17 || this.ReportCategoryId == 90 || this.ReportCategoryId == 91 || this.ReportCategoryId == 92 || this.ReportCategoryId >= 1000) {
            contextObj.reportService.getReportFloorSelection().subscribe(function (resultData) {
                if (resultData["Data"]["Table1"]== "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });
        }
        else if (this.ReportCategoryId == 100 || this.ReportCategoryId == 101 ||
            this.ReportCategoryId == 102 || this.ReportCategoryId == 103 || this.ReportCategoryId == 326)
        {
            contextObj.reportService.getEmployeeOccupancyFloorSelection(id).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];

                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });

        }
        else if (this.ReportCategoryId == 99 || this.ReportCategoryId == 48) {
            contextObj.reportService.getDrawingsWithDataforEmployee(moduleIdEmp).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });

        }
        else if (this.ReportCategoryId == 107) {
            contextObj.reportService.getUserAccessibleDrawingHavingDataForObjectCategory(contextObj.objectCategoryId).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });

        }
        else if (this.ReportCategoryId == 108) {

            contextObj.employeeService.getAssignedEmployeeMainListData(12).subscribe(function (result) {
                
                if (result["Data"].Table1 == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                else {
                    var fieldobj = new Array<FieldTable>();
                    fieldobj.push({
                        Table1: eval(result["Data"].Table1),
                        Table2: eval(result["Data"].Table2),
                        Table3: eval(result["Data"].Table3),
                        expanded: true
                    });
                    contextObj.FieldTable = fieldobj;
                }
            });

        }

       

       
        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    }


    submit(value: any) {
        this.Ids = JSON.parse(value.FieldIdValues);
        if (this.Ids.length == 0) {

           if (this.Criteria == 1) {
               this.notificationService.ShowToaster("Select Site(s)", 2);
           }

           else if (this.Criteria == 2) {
               this.notificationService.ShowToaster("Select Building(s)", 2);
           }

           else {
               this.notificationService.ShowToaster("Select Floor(s)", 2);
           }

            
        }
        else {
            var newselectedIds = '';
            for (let count = 0; count < this.Ids.length; count++) {
                newselectedIds = newselectedIds + this.Ids[count]["ValueId"] + ','
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds.emit(newselectedIds);
        }
        
        //var contextObj = this;
        //if (contextObj.selectedUserId > 0) {

        //    this.reportService.updateDrawingAccessForUser(value, contextObj.module, contextObj.selectedUserId).subscribe(function (resultData) {

        //        if (resultData.StatusId == 1) {
        //            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
        //        } else {
        //            contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
        //        }
        //    });
        //} else {
        //    this.reportService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
        //        contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
        //    });
        //}

    }


    private emptyDataMsgSettings() {  
        var contextObj = this;
            if (contextObj.Criteria == 1) {
                contextObj.notificationService.ShowToaster("No Sites exist", 2);
            }

            else if (contextObj.Criteria == 2) {
                contextObj.notificationService.ShowToaster("No Buildings exist", 2);
            }

            else {
                contextObj.notificationService.ShowToaster("No Floors exist", 2);
            }        
    }

}

export interface FieldTable {
    Table1: any;
    Table2: any;
    Table3: any;
    expanded: boolean;
}
export interface TreeViewColumn {
    clmn1?: any[];
    clmn2?: any[];
    clmn3?: any[];
}



