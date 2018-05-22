import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
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
import { PMSchedulesAddEditComponent } from './pmschedules-addedit';
import { PMProceduresListComponent } from './PM-Procedures-list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'pmSchedules-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/pmschedules-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, LabelComponent, FieldComponent, Notification, SlideComponent, TabsComponent, TabComponent, PMSchedulesAddEditComponent, PMProceduresListComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['siteId', 'SiteName', 'equipmentCategoryId', 'equipmentClassId', 'routeId', 'RouteName' ]
})

export class PMSchedulesListComponent implements AfterViewInit {
    pageTitle: string;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    siteName: IField[];
    routeName: IField[];
    siteId: any;
    SiteName: any;
    RouteName: any;
    equipmentCategoryId: any;
    equipmentClassId: any;
    objectClassId: any;
    routeId: any;
    equipmentCategoryFieldId: any;
    equipmentTypeId: any;
    masterPMId: any;
    ckblEquipmentNo: IField;
    actionPointUsers: any;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0]};
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    target: number = 0;
    pmEquipmentClassName: any;
    pmEquipmentCategoryName: any;
    pmEquipmentClassId: any;
    returnId: any;
    returnPMId: any;
    returnPMEquipmentCategory: any;
    returnPMEquipmentClass: any;
    returnEquipmentTypeId: any;
    pmIdforProcedure: any;
    enableMenu = [0];

    //Form Id : 215
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (215))
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 3358
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 3359
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
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
        /* {
            "id": 4,
            "title": "PM Alert",
            "image": "PM Alert",
            "path": "PM Alert",
            "subMenu": null,
            "privilegeId": 3360
        },
        {
            "id": 5,
            "title": "Meter PM",
            "image": "Meter PM",
            "path": "Meter PM",
            "subMenu": null,
            "privilegeId": 3360
        } */
    ];
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    showProcedureSlide = false; 
    refreshgrid;

    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.workOrderService.getPMListFields().subscribe(function (resultData) {
            contextObj.siteName = resultData["Data"].find(function (el) { return el.ReportFieldId === 572; });
            contextObj.routeName = resultData["Data"].find(function (el) { return el.ReportFieldId === 5628; });
            contextObj.siteName["FieldValue"] = contextObj.SiteName;
            contextObj.routeName["FieldValue"] = contextObj.RouteName;
            contextObj.fieldObject = resultData["Data"];
        });
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                contextObj.enableMenu = [0];
            }
        });

        /* form id : 215***** PageId :737 */
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 737, contextObj.administrationServices, contextObj.menuData.length);
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
                contextObj.target = 2;
                this.procedureClick(this.inputItems.selectedIds, this.inputItems.rowData["Equipment Category"], this.inputItems.rowData["Equipment Class"], this.inputItems.rowData["EquipmentTypeId"]);
                break;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };

    public onSort(objGrid: any) {
        var contextObj = this;
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    }

    public addClick() {
        debugger
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New PM Schedule";
        var contextObj = this;       
        this.workOrderService.loadPMAddFields(contextObj.siteId, contextObj.equipmentCategoryId, contextObj.routeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.equipmentCategoryId > -1) {
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1383:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = contextObj.equipmentCategoryId;
                            break;
                        case 1384:
                            contextObj.workOrderService.loadEquipmentClassForPM(contextObj.equipmentCategoryId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]
                                }
                            });  
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                }
            } else if (contextObj.routeId > -1) {  
                var tempMasterPM; 
                var tempApplyUpdates;
                var tempEquipmentNo;    
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1369: 
                            contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = [];                           
                            tempMasterPM = contextObj.fieldDetailsAddEdit[i];
                            break;
                        case 1370:
                            tempApplyUpdates = contextObj.fieldDetailsAddEdit[i];
                            break;
                        case 1383:
                        case 1384:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;
                        case 1401:
                            //contextObj.workOrderService.loadRouteEquipmentNoForPM(contextObj.routeId).subscribe(function (resultData) {
                            //    if (resultData["Data"]["LookupValues"]["LookupValues"].length > 0) {
                            //        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]                                    
                            //    }
                            //    tempEquipmentNo = contextObj.fieldDetailsAddEdit[i]; 
                            //    contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                            //    contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                            //    contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                            //});

                            var arrList = new Array();
                            arrList.push(
                                {
                                    ReportFieldId: 5570,
                                    Value: contextObj.routeId
                                }
                            );

                            contextObj.workOrderService.loadRouteEquipmentNoForPM(50902, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                }
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;  
                            tempEquipmentNo = contextObj.fieldDetailsAddEdit[i]; 
                            contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                            contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                            contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                              
                            });                                                                          
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                }               
            } else {
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick() {
        debugger
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit PM Schedule";
        var tempMasterPM;
        var tempApplyUpdates;
        var tempEquipmentNo;  
        var componentCategoryId = this.inputItems.rowData["ComponentCategoryId"];
        this.equipmentTypeId = this.inputItems.rowData["EquipmentTypeId"];
        var objectId = this.inputItems.rowData["ObjectId"];
        this.actionPointUsers = this.inputItems.rowData["Action Point Users"];
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if(this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM Schedule", 2);
        } else {
            this.workOrderService.loadPMEditFields(this.inputItems.selectedIds[0], this.siteId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];  
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {                       
                        case 1320:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            break;
                        case 1369:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            if (contextObj.routeId > -1) {
                                tempMasterPM = contextObj.fieldDetailsAddEdit[i];
                            }
                            break;
                        case 1370:
                            if (contextObj.routeId > -1) {
                                tempApplyUpdates = contextObj.fieldDetailsAddEdit[i];
                            }
                            break;
                        case 1383:
                            if (contextObj.routeId > -1) {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            } else {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            }
                            break;
                        case 1384:
                            if (contextObj.routeId > -1) {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            } else {
                                contextObj.workOrderService.loadEquipmentClassForPM(componentCategoryId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                    }
                                });
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            }
                            break;
                        case 1401:
                            var arrList = new Array();
                            arrList.push(
                                {
                                    ReportFieldId: 5570,
                                    Value: contextObj.routeId
                                }
                            );
                            var tempArray = new Array();
                            tempArray.push(objectId);
                            if (contextObj.routeId > -1) {
                                //contextObj.workOrderService.loadRouteEquipmentNoForPM(contextObj.routeId).subscribe(function (resultData) {
                                //    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                //        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]
                                //        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                //        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                //        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                //    }
                                //});  

                                contextObj.workOrderService.loadRouteEquipmentNoForPM(50902, JSON.stringify(arrList)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;

                                        tempEquipmentNo = contextObj.fieldDetailsAddEdit[i];
                                        contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                                        contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                                        contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                                    }
                                });

                            } else {
                                contextObj.workOrderService.loadEquipmentNoForPM(contextObj.equipmentTypeId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]
                                        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                    }
                                });
                            }                          
                            break;
                        case 1414:
                            switch (contextObj.fieldDetailsAddEdit[i].FieldValue) {
                                case "1":
                                    break;
                                case "2":
                                    var ckblWeekDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1415;
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
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            var rbtnRangeReccurenceNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1421;
                            });
                            var ddlEndAfter = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1422;
                            });
                            var datePickerEndBy = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1198;
                            });
                            switch (rbtnRangeReccurenceNo.FieldValue) {
                                case "11":
                                    break;
                                case "12":
                                    ddlEndAfter.IsEnabled = false;
                                    ddlEndAfter.FieldValue = "1";
                                    datePickerEndBy.IsEnabled = true;
                                    datePickerEndBy.IsVisible = true;
                                    break;
                            }
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                        case 1410:
                            var chkbxAutoGenerate = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1410;
                            });
                            var txtbxGenerateWO = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1411;
                            });
                            var ddlWorkType = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1412;
                            });
                            var ckblActionPointUser = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1423;
                            });
                            if (chkbxAutoGenerate.FieldValue == "1") {
                                txtbxGenerateWO.IsEnabled = true;
                                ddlWorkType.IsEnabled = true;
                                var worktypeId = ddlWorkType.FieldValue;
                                var id = ddlWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id === parseInt(worktypeId); });
                                if (id != undefined) {
                                    if (ckblActionPointUser.MultiFieldValues.length > 0) {
                                        ckblActionPointUser.IsEnabled = true;
                                        ckblActionPointUser.IsVisible = true;
                                    }
                                } else {
                                    ddlWorkType.FieldValue = "-1";
                                    ddlWorkType.IsMandatory = true;

                                    ckblActionPointUser.IsEnabled = false;
                                    ckblActionPointUser.IsVisible = false;
                                    ckblActionPointUser.IsMandatory = false;
                                    ckblActionPointUser.LookupDetails.LookupValues = [];
                                    ckblActionPointUser.MultiFieldValues = [];
                                }
                            }
                            break;
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM Schedule", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    public deletePM() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < this.inputItems.selectedIds.length; i++) {
            arrayList.push({
                ReportFieldId: 5563,
                Value: this.inputItems.selectedIds[i]
            });
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.workOrderService.postDeletePMSchedule(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"].ServerId >= 0) {
                    contextObj.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
                        contextObj.totalItems = resultData["Data"].DataCount;
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.splitviewInput.showSecondaryView = false;
                        if (contextObj.totalItems < 1) {
                            contextObj.enableMenu = [0];
                            contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                        }
                        contextObj.notificationService.ShowToaster("Selected PM Schedule(s) deleted", 3);
                    });
                } else if (resultData["Data"].ServerId == -1) {
                    contextObj.notificationService.ShowToaster("Some of selected PM Schedule(s) in use, cannot be deleted", 5);
                }
            });
        } else {
            this.workOrderService.postDeletePMSchedule(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"].ServerId >= 0) {
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0];
                        contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                    }
                    contextObj.notificationService.ShowToaster("Selected PM Schedule(s) deleted", 3);
                } else if (resultData["Data"].ServerId == -1) {
                    contextObj.notificationService.ShowToaster("Selected PM Schedule in use, cannot be deleted", 5);
                }
            });
        }        
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                if (event["returnData"] == "2") {
                    this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
                        contextObj.totalItems = resultData["Data"].DataCount;
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;  
                        contextObj.splitviewInput.showSecondaryView = false;     
                        if (contextObj.totalItems > 0) {
                            contextObj.enableMenu = [0, 1, 2, 3];
                        }                 
                    });
                } else {
                    this.returnId = JSON.parse(event.returnData);
                    this.returnPMId = this.returnId[0].Id;
                    this.returnPMEquipmentCategory = this.returnId[0]["Equipment Category"];
                    this.returnPMEquipmentClass = this.returnId[0]["Equipment Class"];
                    this.returnEquipmentTypeId = this.returnId[0].EquipmentTypeId;
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    this.itemsSource = retUpdatedSrc["itemSrc"];
                    this.splitviewInput.showSecondaryView = false;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3];
                    }
                    this.showProcedureSlide = true; 
                }                               
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //this.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                this.splitviewInput.showSecondaryView = false;
            }            
        }
    }

    public inlineDelete(event: any) {
        this.deletePM();
    }

    okDelete(event: Event) {
        this.deletePM();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = false;
        this.showProcedureSlide = false;        
    }

    okProcedureClick(event: any) {
        this.procedureClick(this.returnPMId, this.returnPMEquipmentCategory, this.returnPMEquipmentClass, this.returnEquipmentTypeId);
        this.showProcedureSlide = false;
    }

    cancelProcedureClick(value: any) {
        this.showProcedureSlide = false;
    } 

    public procedureClick(pmId, pmEquipmentCategory, pmEquipmentClass, pmEquipmentTypeId) {
        this.pageTitle = "Procedures";
        this.target = 2;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM", 2);
        } else {
            this.pmIdforProcedure = pmId;
            this.pmEquipmentClassName = pmEquipmentClass;
            this.pmEquipmentCategoryName = pmEquipmentCategory;
            this.pmEquipmentClassId = pmEquipmentTypeId;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    onPMScheduleRowUpdate(event) {
        this.refreshgrid = [];
        this.itemsSource.find(function (item) {
            if (item.Id == event.pmId) {
                item["Procedure Count"] = event.procedureCount.toString();
                item["Sequence"] = event.sequenceNumber.toString();;
                return true;
            } else {
                return false;
            }
        }); 
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(this.itemsSource);
        //this.itemsSource = updatedData;    
        this.refreshgrid = this.refreshgrid.concat([true]);
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}