import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { MasterPMScheduleAddEditComponent } from './masterpm-addedit';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { PMProceduresListComponent } from './PM-Procedures-list.component';

@Component({
    selector: 'Master-PM-Schedules-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/Master-PM-Schedules-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, MasterPMScheduleAddEditComponent, TabsComponent, TabComponent, PMProceduresListComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, WorkOrdereService, AdministrationService],
})

export class MasterPMSchedulesListComponent implements AfterViewInit {
    pageTitle: string;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    enableMenu = [];
    target: number = 0;
    masterPMTab: boolean = false;
    masterPMProcedureTab: boolean = false;
    selectedTab: number = 0;
    deleteIndex: number = 0;
    localselection: number;
    equipmentClassName: any;
    equipmentCategoryName: any;
    equipmentClassId: any;
    pmId: any;
    inUse: any;
    isSiteAdmin;
    isSiteUser;
    isSubscribed: boolean = false;
    //Form Id : 198
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (198))
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 3358
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 3359
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 3360
        },
        {
            "id": 3,
            "title": "Procedures",
            "image": "Procedures",
            "path": "Procedures",
            "subMenu": null,
            "privilegeId": 3360
        }
    ];
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    refreshgrid;

    constructor(private administrationService: AdministrationService,private notificationService: NotificationService, private generFun: GeneralFunctions, private workOrderService: WorkOrdereService) { }

    ngAfterViewInit() {
        this.LoadData();
    }
    
    LoadData() {
        var contextObj = this;
        let rptField = [5606, 5608, 5612, 5602];
        let count = rptField.length;

        this.workOrderService.getMasterPMScheduleColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
            });
            contextObj.fieldObject = resultData["Data"];
        });

        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Master PM Schedules exist", 2);
                contextObj.enableMenu = [0];
            }
        });

        //form id : 198***** PageId :2540
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2540, contextObj.administrationService, contextObj.menuData.length);
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
            case 3:
                this.procedureClick();
                break;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Master PM Schedule";
        var contextObj = this;
        this.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
        });
        this.workOrderService.loadMasterPMAddFields().subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                switch (contextObj.fieldDetailsAddEdit[i].FieldId) {                         
                    case 1534:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 1547:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 1540:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 2954:
                        if (contextObj.isSubscribed) {
                            contextObj.fieldDetailsAddEdit[i]["IsValidated"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                        }
                        else
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        break;
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Master PM Schedule";
        var contextObj = this;
        this.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
        });
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        } else {
            this.workOrderService.loadMasterPMEditFields(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];                    
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1537:
                        case 1538:
                            contextObj.workOrderService.checkMasterPMScheduleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (checkInUse) {
                                if (checkInUse["Data"] == 1) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                } else {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                                    contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                }
                            });                              
                            break;
                        case 1540:
                            switch (contextObj.fieldDetailsAddEdit[i].FieldValue) {
                                case "1":
                                    break;
                                case "2":
                                    var ckblWeekDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1543;
                                    });
                                    ckblWeekDays.IsEnabled = true;
                                    ckblWeekDays.IsVisible = true;
                                    ckblWeekDays.FieldLabel = "";
                                    break;
                                case "3":
                                    var rbtnMonthlyReccurencePatternCriteria = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1372;
                                    });
                                    var ddlMonthlyDayNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1373;
                                    });
                                    var ddlMonthlyWeekOccurence = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1374;
                                    });
                                    var ddlMonthlyWeekDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1375;
                                    });
                                    rbtnMonthlyReccurencePatternCriteria.IsEnabled = true;
                                    rbtnMonthlyReccurencePatternCriteria.IsVisible = true;
                                    rbtnMonthlyReccurencePatternCriteria.FieldLabel = "";
                                    ddlMonthlyDayNo.IsVisible = true;
                                    ddlMonthlyWeekOccurence.IsVisible = true;
                                    ddlMonthlyWeekDay.IsVisible = true;
                                    ddlMonthlyDayNo.FieldLabel = "";
                                    ddlMonthlyWeekOccurence.FieldLabel = "";
                                    ddlMonthlyWeekDay.FieldLabel = "";
                                    switch (rbtnMonthlyReccurencePatternCriteria.FieldValue) {
                                        case "5":
                                            ddlMonthlyDayNo.FieldValue = "1";
                                            ddlMonthlyWeekOccurence.FieldValue = "1";
                                            ddlMonthlyWeekDay.FieldValue = "1";                                           
                                            break;
                                        case "6":
                                            ddlMonthlyDayNo.IsEnabled = true;
                                            ddlMonthlyWeekOccurence.FieldValue = "1";
                                            ddlMonthlyWeekDay.FieldValue = "1";
                                            break;
                                        case "7":
                                            ddlMonthlyDayNo.FieldValue = "1";
                                            ddlMonthlyWeekOccurence.IsEnabled = true;
                                            ddlMonthlyWeekDay.IsEnabled = true;
                                            break;
                                    }
                                    break;
                                case "4":
                                    var rbtnYearlyReccurencePatternCriteria = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1381;
                                    });
                                    var ddlYearlyDayNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1376;
                                    });
                                    var ddlYearlyMonthDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1377;
                                    });
                                    var ddlYearlyWeekOccurence = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1378;
                                    });
                                    var ddlYearlyWeekDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1379;
                                    });
                                    var ddlYearlyMonthofYear = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1380;
                                    });
                                    rbtnYearlyReccurencePatternCriteria.IsEnabled = true;
                                    rbtnYearlyReccurencePatternCriteria.IsVisible = true;
                                    rbtnYearlyReccurencePatternCriteria.FieldLabel = "";
                                    ddlYearlyDayNo.IsVisible = true;
                                    ddlYearlyMonthDay.IsVisible = true;
                                    ddlYearlyWeekOccurence.IsVisible = true;
                                    ddlYearlyWeekDay.IsVisible = true;
                                    ddlYearlyMonthofYear.IsVisible = true;
                                    ddlYearlyDayNo.FieldLabel = "";
                                    ddlYearlyMonthDay.FieldLabel = "";
                                    ddlYearlyWeekOccurence.FieldLabel = "";
                                    ddlYearlyWeekDay.FieldLabel = "";
                                    ddlYearlyMonthofYear.FieldLabel = "of";
                                    switch (rbtnYearlyReccurencePatternCriteria.FieldValue) {
                                        case "8":
                                            ddlYearlyDayNo.FieldValue = "1";
                                            ddlYearlyMonthDay.FieldValue = "1";
                                            ddlYearlyWeekOccurence.FieldValue = "1";
                                            ddlYearlyWeekDay.FieldValue = "1";
                                            ddlYearlyMonthofYear.FieldValue = "1";
                                            break;
                                        case "9":
                                            ddlYearlyDayNo.IsEnabled = true;
                                            ddlYearlyMonthDay.IsEnabled = true;
                                            ddlYearlyWeekOccurence.FieldValue = "1";
                                            ddlYearlyWeekDay.FieldValue = "1";
                                            ddlYearlyMonthofYear.FieldValue = "1";
                                            break;
                                        case "10":
                                            ddlYearlyDayNo.FieldValue = "1";
                                            ddlYearlyMonthDay.FieldValue = "1";
                                            ddlYearlyWeekOccurence.IsEnabled = true;
                                            ddlYearlyWeekDay.IsEnabled = true;
                                            ddlYearlyMonthofYear.IsEnabled = true;
                                            break;
                                    }
                                    break;
                            }
                            break;  
                        case 2954:
                            if (contextObj.isSubscribed) {
                                contextObj.fieldDetailsAddEdit[i]["IsValidated"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            }
                            else
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;            
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workOrderService.checkMasterPMScheduleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (checkInUse) {
                if (checkInUse["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Master PM Schedule in use, cannot be deleted", 5);
                } else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });           
        }
    }

    public deleteMasterPM() {
        var contextObj = this;
        this.workOrderService.postDeleteMasterPMSchedule(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Master PM Schedule deleted", 3);
            }
        });
    }

    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public inlineDelete(event: any) {
        this.deleteMasterPM();
    }

    okDelete(event: Event) {
        this.deleteMasterPM();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    procedureClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        } else {
            this.equipmentClassName = contextObj.inputItems.rowData["Equipment Class"];
            this.equipmentCategoryName = contextObj.inputItems.rowData["Equipment Category"];
            this.equipmentClassId = contextObj.inputItems.rowData["ClassId"];
            this.pmId = contextObj.inputItems.selectedIds[0];
                contextObj.masterPMProcedureTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 100);
        }
    }

    getSelectedTab(event: any) {
        var contextObj = this;
        if (event[0] == 0 && event[1] == true && contextObj.masterPMProcedureTab) {
            contextObj.LoadData();
            setTimeout(function () {
                contextObj.deleteIndex = 1;
               
            }, 50);
            contextObj.masterPMProcedureTab = false;
            setTimeout(function () {
                contextObj.deleteIndex = 0;
            }, 50);           
        }
        this.selectedTab = event[0];
    }
}