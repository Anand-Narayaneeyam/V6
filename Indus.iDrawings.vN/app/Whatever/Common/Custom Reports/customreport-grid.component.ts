import {Component, Output, EventEmitter, Input,OnInit, } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {CommonService} from '../../../Models/Common/common.service'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {CustomReportAddEdit} from './customreport-addedit.component';


@Component({
    selector: 'customReportGrid',
    templateUrl: './app/Views/Common/Custom Reports/customreport-grid.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, CustomReportAddEdit],
    providers: [CommonService, NotificationService, HTTP_PROVIDERS, GeneralFunctions],
    inputs: ['moduleId']

})

export class CustomReportGridComponent implements OnInit {
    @Input() moduleId: number;   
    fieldObject: IField[];     
    itemsSource: any[];
    fieldObjectAddEdit: IField[]; 
    itemsSourceAddEdit: any[];
    inputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol:"[Report Name]", selectioMode:"single" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "Custom Report";
    enableMenu = [];
    btnName: string = "Save";
    reportId = 0;
    reportCatgryId: number =0;
    QueryCatgryId: number = 0;
    ObjCategryId: number = 0;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;   
    private sessionUserId: number = 0;
    private sessionUserRoleId: number = 0;
    refreshgrid;
    constructor(private commonService: CommonService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
       
    }

    ngOnInit() {
        var contextObj = this;
        contextObj.commonService.getCustomReportListColumns().subscribe(function (result) {
            console.log(result["Data"]);
            result["Data"].find(function (item) {
                if ( item.ReportFieldId == 155) {
                    item.Width = '0.85*';
                    return true;
                } else return false;
            })
            contextObj.fieldObject = result["Data"]
        });
        contextObj.commonService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

        });
        this.dataLoad(1, contextObj); 
        this.getCustomReportSettings(); 
    }
    getCustomReportSettings() {

        switch (this.moduleId) {
            case 2: //Projects               
                this.QueryCatgryId = 17;
                this.reportCatgryId = 23;               
                break;
            case 3: //Space
                this.QueryCatgryId  = 16;
                this.reportCatgryId = 17;               
                break;
            case 4: //Documents
                this.QueryCatgryId = 18;
                this.reportCatgryId = 63;               
                break;
            case 5: //Employees
                this.QueryCatgryId = 19;
                this.reportCatgryId = 44; 
                break;              
            case 6: //Telecom
                this.ObjCategryId = 3;
                this.QueryCatgryId  = 20;
                this.reportCatgryId = 190;               
                break;
            case 7: //Asset
                this.ObjCategryId = 1;
                this.QueryCatgryId  = 20;
                this.reportCatgryId = 43;              
                break;
            case 8: //Furniture
                this.ObjCategryId = 2;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 187;              
                break;         
            case 17://Electrical
                this.ObjCategryId = 8;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 196;             
                break;
            case 18://Fire and Safety
                this.ObjCategryId = 9;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 199;            
                break;
            case 12: //CAI
                this.QueryCatgryId = 21;            
                this.reportCatgryId = 38;               
                break;    
            case 24://Security Assets
                this.ObjCategryId = 20;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 206;
                break;       
            case 25://Mechanical
                this.ObjCategryId = 10;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 206;
                break;
            case 26://Plumbing
                this.ObjCategryId = 11;
                this.QueryCatgryId = 20;
                this.reportCatgryId =210;
                break;
            case 27://Medical Gas
                this.ObjCategryId = 12;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 214;
                break;
            case 30: //RPM
                this.QueryCatgryId = 46;
                this.reportCatgryId = 410;
                break;
            case 9: //WO
                this.QueryCatgryId = 47;
                this.reportCatgryId = 411;
                break;
        }
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
    public dataLoad(target?: number, context?: any) {
        context.commonService.getCustomReportData(context.moduleId, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {                   
            if (result["Data"].FieldBinderData != "[]") {
                context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                context.totalItems = context.itemsSource.length;                                      
            } else {
                context.totalItems = 0;
                context.notificationService.ShowToaster("No Custom Reports exist", 2);
                context.enableMenu = [1];
            }
            if (target == 1)  
                context.itemsPerPage = result["Data"].RowsPerPage;                                                                    
        });
    }
    
    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
            case 2:               
                this.addEditReportClick(event.value);
                break;                      
            case 3:
                this.deleteClick()
                break;
            default:
                break;
        }
    }

    private addEditReportClick(target) {
        var contextObj = this;
        var isLoadAddEdit = true;     
        if (target == 1) {
            contextObj.btnName = "Save";
            this.reportId = 0;
        } else {
            if (contextObj.sessionUserRoleId == 5 && (contextObj.inputItems.rowData["AddedBy"] != contextObj.sessionUserId)) {
                contextObj.notificationService.ShowToaster("This Custom Report is created by Another User", 2);
                isLoadAddEdit = false;
            } else {
                contextObj.btnName = "Save Changes";
                this.reportId = this.inputItems.selectedIds[0];
            }
        }
        if (isLoadAddEdit){
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"]          
            });
          
        var listParams = new Array();
        listParams.push(
            { ReportFieldId: 353, Value: contextObj.moduleId },
            { ReportFieldId: 141, Value: this.reportId },
            { ReportFieldId: 348, Value: this.reportCatgryId },
            { ReportFieldId: 66, Value: "" }
        );
        contextObj.commonService.loadCustomRptAddEditData(this.reportId, target, JSON.stringify(listParams),this.ObjCategryId).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);          
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    }


    saveCustomRptRow(event) {
        let retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, event["actionName"], event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.refreshgrid = [];
        if (event["actionName"] == "add") {
           // this.totalItems = retUpdatedSrc["itemCount"];         
           this.itemsSource = retUpdatedSrc["itemSrc"];
           this.totalItems = retUpdatedSrc["itemCount"];    
           this.enableMenu = [1, 2, 3];       
        } else {
            this.refreshgrid = this.refreshgrid.concat([true]);
        }    
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    private deleteClick() {
        var context = this;    
        if (this.sessionUserRoleId == 5 && this.sessionUserId != this.inputItems.rowData["AddedBy"]) 
            this.notificationService.ShowToaster("This Custom Report is created by Another User", 2);
        else          
            this.showSlide = !this.showSlide;
                      
    }

  

    private okDelete(event: Event) {
        this.deleteReport();
        this.showSlide = !this.showSlide;
    }

    private cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    private closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    private deleteReport() {     
        var contextObj = this;
        contextObj.commonService.deleteCustomReport(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {                           
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;   
                    case 1:
                        let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        if (contextObj.totalItems < 1) {
                            contextObj.enableMenu = [1];
                        }
                        contextObj.notificationService.ShowToaster("Custom Report deleted", 3);
                        break;                     
                }                                
            });       
    }


    
}
