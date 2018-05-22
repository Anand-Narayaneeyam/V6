import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField} from  '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'gl-accounts',
    templateUrl: './app/Views/Administration/General Settings/gl-accounts.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, LabelComponent, FieldComponent, Notification, SlideComponent, TabsComponent, TabComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
   
})

export class GLAccountsComponent implements AfterViewInit {
    pageTitle: string;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    target: number = 0;
    enableMenu = [0];
    fieldDetailsAddEdit: IField[];

 

    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 3263
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 3264
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": 3265
        }
    ];
    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {       
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 736, contextObj.administrationServices, contextObj.menuData.length);

            var contextObj = this;
            this.administrationServices.getGLAccountsListFields().subscribe(function (resultData) {
         
                contextObj.fieldObject = resultData["Data"];
            });
            this.LoadGrid();
      }


 
        LoadGrid() {
            var contextObj = this;
            this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir,0).subscribe(function (resultData) {
  
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [0, 1, 2,];
                }
                else {
                    contextObj.notificationService.ShowToaster("No GL Accounts exist", 2);
                    contextObj.enableMenu = [0];
                    contextObj.itemsSource = [];
                }
            });
        }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    }

    public pageChanged(event: any) {

            var contextObj = this;
            this.pageIndex = event.pageEvent.page;
            this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, 0).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });

    }

    public onSort(objGrid: any) {
            var contextObj = this;
        this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir,0).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });

   }

    public addClick() {
        this.action = "add";
        this.pageTitle = "New GL Account";
        this.btnName = "Save";
        var contextObj = this;

        this.administrationServices.getGLAccountsAddEdit(1,0).subscribe(function (resultData) {
      
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
       }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit GL Account";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
          
                this.administrationServices.getGLAccountsAddEdit(2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
               
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
            }
        }
      }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }

    }

        public deleteProcedure() {
        var contextObj = this;          
        contextObj.administrationServices.GLAccountsdelete(contextObj.inputItems.rowData["Id"]).subscribe(function (resultData) {
     
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (resultData["Data"].ServerId == 0) {
                                contextObj.notificationService.ShowToaster("Selected GL Account deleted", 3);
                                contextObj.LoadGrid();
                            }
                    }
                });

        }
       


    okDelete(event: Event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }


    onSubmit(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add");
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit");
                break;
        }
    }


    postSubmit(strsubmitField: string, target: string) {
  
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(strsubmitField);

            if (target == "add") {

                contextObj.administrationServices.GLAccountsSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData) {
            
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "add") {
                                contextObj.notificationService.ShowToaster("GL Account added", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.LoadGrid();
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("GL Account code already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("GL Account name already exists", 5);
                            }

                    }

                });
            }
            else if (target == "edit") {
                contextObj.administrationServices.GLAccountsSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "edit") {
                                contextObj.notificationService.ShowToaster("GL Account details updated", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.LoadGrid();
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("GL Account code already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("GL Account name already exists", 5);
                            }
                    }

                });

            }
        

        }       

    


}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}