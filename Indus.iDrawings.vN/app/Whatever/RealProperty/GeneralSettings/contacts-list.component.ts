import {Component, AfterViewInit, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
//importing addedit component
import { ContactAddEditComponent } from './contacts-addedit.component'

@Component({
    selector: 'contact-list',
    templateUrl: './app/Views/RealProperty/GeneralSettings/contacts-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, ContactAddEditComponent],
    providers: [RealPropertyService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['moduleId','isAdministration']
})

export class ContactsListComponent implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    pageTitle: string = "New Contact";
    enableMenu = [];
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
    isAdministration: boolean = false;
    moduleId: string = "";
    refreshgrid;

    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() { 
        var contextObj = this;
        this.realPropertyService.getContactColumns().subscribe(function (result) {
            
            if (contextObj.isAdministration == true) {
                result["Data"].find(function (item) {
                    if (item.FieldId == 941)
                        item.FieldLabel = "Client";
                });

                result["Data"].find(function (item) {
                    if (item.FieldId == 2992) {
                        item.IsEnabled = true;
                        item.IsVisible = true;
                    }
                });
            }
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.realPropertyService.getContactData(contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Contacts exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Contact";
        this.realPropertyService.loadContactsAddEdit(0, 1, this.moduleId).subscribe(function (resultData) {

            
            if (contextObj.isAdministration == true) {
                var tempData = resultData["Data"].find(function (item) {
                    if (item.FieldId == 941) {
                        item.FieldLabel = "Client";
                        return item;
                    }
                });

                resultData["Data"].find(function (item) {
                    if (item.FieldId == 2992) {
                        item.IsEnabled = true;
                        item.IsVisible = true;
                    }
                });

                var temp = [];
                temp.push(tempData);
                var x = resultData["Data"].splice(0, 14);
                var y = resultData["Data"].splice(1, 1);
                for (let i = 0; i < x.length; i++) {
                    temp.push(x[i]);
                }
                temp.push(y[0]);
                contextObj.fieldDetailsAdd1 = temp;
            }
            else
                contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
        //this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Contact";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Contact", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.realPropertyService.loadContactsAddEdit(this.inputItems.selectedIds[0], 2, this.moduleId).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (contextObj.isAdministration == true) {
                    var tempData = result["Data"].find(function (item) {
                        if (item.FieldId == 941) {
                            item.FieldLabel = "Client";
                            return item;
                        }
                    });

                    result["Data"].find(function (item) {
                        if (item.FieldId == 2992) {
                            item.IsEnabled = true;
                            item.IsVisible = true;
                        }
                    });

                    var temp = [];
                    temp.push(tempData);
                    var x = result["Data"].splice(0, 14);
                    var y = result["Data"].splice(1, 1);
                    for (let i = 0; i < x.length; i++) {
                        temp.push(x[i]);
                    }
                    temp.push(y[0]);
                    contextObj.fieldDetailsAdd1 = temp;
                }
                else
                    contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }

    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contact", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            var contextObj = this;
            var reportFieldIdArray: any[] = [{ ReportFieldId: 173, Value: 769 }];
            contextObj.realPropertyService.checkEntityReferenceExists(JSON.stringify(reportFieldIdArray), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Contact in use, cannot be deleted", 5);
                } else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }

       // contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }


    deleteContacts() {
        var contextObj = this;
        
        contextObj.realPropertyService.deleteContacts(contextObj.inputItems.selectedIds[0], contextObj.moduleId).subscribe(function (resultData) {
            
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Contact deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Contact in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}