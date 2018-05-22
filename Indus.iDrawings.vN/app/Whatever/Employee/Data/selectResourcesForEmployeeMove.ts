import { Component, Output, EventEmitter, AfterViewInit, OnInit, Input, OnChanges, SimpleChange, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {EmployeeService} from '../../../Models/Employee/employee.services'
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({

    selector: 'SelectReocource-ForEmployeeMove',
    templateUrl: './app/Views/Employee/Data/selectResourcesForEmployeeMove.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, EmployeeService, NotificationService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})

export class SelectReocourceForEmployeeMove implements OnInit, OnChanges {
    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 300;
    fieldObject: IField[];
    itemsSource: any[];
    Chekedarray: any[];
    UnchekedChekedarray: any[];
    arrayforcancel: any[];
    itemsSourceFormultiplemove: any[];
    resourcesfordisconnection: any[];
    messages: any[];    
    ddlUserCategory: IField;
    deleteConfrmtnMsg: string;
    fieldType: string;
    ClassId: any;
    addlDataField: number[];
    differ: any;
    alignContent: string;
    employeename: string;
    employeecode: string;
    listtarget: number = 1;
    Target: number;
    totalItems: number = 0;
    count: number = 0;
    itemsPerPage: number = 100;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    message;
    hasFieldValue: boolean = false;
    @Input() selectedId: number;
    @Input() employeemultiplemove: any[];
    @Input() IsNeedToUpdateSource: boolean;
    @Input() IsApprovalneedforempmove: boolean;
    @Output() employeeresoursestatus = new EventEmitter();
    @Output() IsResourceOpened = new EventEmitter();
    @Output() AfterCancel = new EventEmitter();
    @Output() ResourceforApprovalprocess = new EventEmitter();
    isinUse: boolean = false;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "[]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private EmployeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions, private cdr: ChangeDetectorRef, private http: Http) { }
    ngOnInit() {
        var contextObj = this;
        contextObj.EmployeeService.getRecourcedatafieldsforemployeemove().subscribe(function (resultdata) {          
            contextObj.fieldObject = resultdata["Data"];
            contextObj.fieldObject[1].FieldLabel = "Select";
            contextObj.dataLoad();            
        });
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes['IsNeedToUpdateSource'] && changes['IsNeedToUpdateSource']['currentValue']) {
            if (changes['IsNeedToUpdateSource']['currentValue'] == true) {
                this.Multiplerecourcemove();
            }

        }
        }
    public dataLoad() {
        var contextObj = this;
        contextObj.Target = 1;
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0) {
            contextObj.Target = 2;
            contextObj.selectedId = contextObj.employeemultiplemove[0].Id;
            //contextObj.IsResourceOpened.emit({ status: "2" });
        }
        contextObj.EmployeeService.getRecourcedataforemployeemove(contextObj.selectedId).subscribe(function (resultdata) {
            contextObj.totalItems = resultdata["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultdata["Data"].FieldBinderData);
            contextObj.itemsSourceFormultiplemove = [];
            contextObj.resourcesfordisconnection = [];
            if (contextObj.itemsSource.length == 0) {
                if (contextObj.employeemultiplemove == undefined || contextObj.employeemultiplemove.length == 0) {
                    contextObj.IsResourceOpened.emit({ status: "1" });
                }
                else {                    
                    contextObj.IsResourceOpened.emit({ status: "2" });
                }
                //contextObj.employeeresoursestatus.emit({ status: "Fail" });

            }
            else {
                if (contextObj.employeemultiplemove == undefined || contextObj.employeemultiplemove.length == 0)
                    contextObj.IsResourceOpened.emit({ status: "1" });
                else {
                    contextObj.itemsSourceFormultiplemove = contextObj.itemsSource;
                    contextObj.IsResourceOpened.emit({ status: "2" });
                }
            }
            if (contextObj.itemsSource.length > 0) {
                contextObj.totalItems = contextObj.itemsSource.length;
                contextObj.employeename = contextObj.itemsSource[0]["Employee Name"];
                contextObj.employeecode = contextObj.itemsSource[0]["EmployeeCode"];
                if (contextObj.Target == 2) {
                    var Previousbutton = <HTMLInputElement>document.getElementById("Previous");
                    Previousbutton.className = "Disablebutton";
                }
            }
        });
    }
    Next(event: any) {
        var contextObj = this;  
        var tempNextarray = new Array();
        var Nextbutton = <HTMLInputElement>document.getElementById("Next"); 
        var Previousbutton = <HTMLInputElement>document.getElementById("Previous");
        Previousbutton.disabled = false;
        Previousbutton.className = "Savebutton";
        //contextObj.Chekedarray = contextObj.itemsSource.filter(function (item) { return (item["Select All"] == true && item["Select All"] != undefined) });
        //contextObj.UnchekedChekedarray = contextObj.itemsSource.filter(function (item) { return (item["Select All"] == false) });
        if (contextObj.count == undefined)
            contextObj.count = 0;
        else if (contextObj.employeemultiplemove.length < contextObj.count) 
            contextObj.count = contextObj.employeemultiplemove.length;
        if (contextObj.count < contextObj.employeemultiplemove.length-1)
            contextObj.count++;
        if (contextObj.count == contextObj.employeemultiplemove.length - 1) {
            Nextbutton.disabled = true;
            Nextbutton.className = "Disablebutton";
        }
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0)
            contextObj.selectedId = contextObj.employeemultiplemove[contextObj.count].Id;
        contextObj.EmployeeService.getRecourcedataforemployeemove(contextObj.selectedId).subscribe(function (resultdata) {
            contextObj.totalItems = resultdata["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultdata["Data"].FieldBinderData);
            
            //contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.concat(contextObj.itemsSource);
            //contextObj.itemsSource = contextObj.UnchekedChekedarray;
            if (contextObj.itemsSource.length == 0)
                contextObj.notificationService.ShowToaster("No Resources exist", 3);
            if (contextObj.itemsSource.length > 0) {
                contextObj.employeename = contextObj.itemsSource[0]["Employee Name"];
                contextObj.employeecode = contextObj.itemsSource[0]["EmployeeCode"];
                contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.concat(contextObj.itemsSource);
            }
            if (contextObj.Chekedarray != undefined && contextObj.Chekedarray.length > 0 && contextObj.itemsSource.length > 0) {
                tempNextarray = contextObj.Chekedarray.concat(contextObj.itemsSource);
                var Tempid = [];
                var uniquesData = [];
                var index;
                for (var i = 0; i < tempNextarray.length; i++) {
                    index = Tempid.indexOf(tempNextarray[i].ObjectId);
                    if (index == -1) {
                        Tempid.push(tempNextarray[i].ObjectId);
                        uniquesData.push(tempNextarray[i]);
                    } else {
                        uniquesData[index].DIFF += tempNextarray[i].DIFF;
                    }
                }
                tempNextarray = uniquesData;
                contextObj.itemsSource = tempNextarray;
                contextObj.itemsSource = tempNextarray.filter(function (item) { return (item["EmployeeId"] == contextObj.selectedId) });
            }
            if (contextObj.UnchekedChekedarray != undefined && contextObj.UnchekedChekedarray.length > 0 && contextObj.itemsSource.length > 0) {
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    for (var j = 0; j < contextObj.UnchekedChekedarray.length; j++) {
                        if (contextObj.itemsSource[i]["EmployeeId"] == contextObj.UnchekedChekedarray[j]["EmployeeId"]) {
                            if (contextObj.itemsSource[i]["ObjectId"] == contextObj.UnchekedChekedarray[j]["ObjectId"]) {
                                if (contextObj.itemsSource[i]["Select"] == contextObj.UnchekedChekedarray[j]["Select"]) {
                                    contextObj.itemsSource[i]["Select"] = true;
                                }
                                else {
                                    contextObj.itemsSource[i]["Select"] = false;
                                }
                            }
                        }
                    }
                }
            } 
            contextObj.totalItems = contextObj.itemsSource.length;            
        });
    }
    previous(event: any) {
        var contextObj = this;  
        var Nextbutton = <HTMLInputElement>document.getElementById("Next"); 
        var Previousbutton = <HTMLInputElement>document.getElementById("Previous");
        Nextbutton.disabled = false; 
        Nextbutton.className = "Savebutton";
        var tempPreviousarray = new Array();
        if (contextObj.count == undefined)
            contextObj.count = 0;
        else if (contextObj.employeemultiplemove.length < contextObj.count) 
            contextObj.count = contextObj.employeemultiplemove.length;         
        if (contextObj.count>0)
            contextObj.count--;
        if (contextObj.count == 0) {
            Previousbutton.disabled = true;
            Previousbutton.className = "Disablebutton";
        }  
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0)
            contextObj.selectedId = contextObj.employeemultiplemove[contextObj.count].Id;
        contextObj.EmployeeService.getRecourcedataforemployeemove(contextObj.selectedId).subscribe(function (resultdata) {
            contextObj.totalItems = resultdata["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultdata["Data"].FieldBinderData);
            //contextObj.itemsSource = contextObj.Chekedarray;
            if (contextObj.itemsSource.length == 0)
                contextObj.notificationService.ShowToaster("No Resources exist", 3);
            contextObj.totalItems = contextObj.itemsSource.length;
            if (contextObj.itemsSource.length > 0) {
                contextObj.employeename = contextObj.itemsSource[0]["Employee Name"];
                contextObj.employeecode = contextObj.itemsSource[0]["EmployeeCode"];
                contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.concat(contextObj.itemsSource);
            }
            if (contextObj.Chekedarray != undefined && contextObj.Chekedarray.length > 0 && contextObj.itemsSource.length > 0) {
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    for (var j = 0; j < contextObj.Chekedarray.length; j++) {
                        if (contextObj.itemsSource[i]["EmployeeId"] == contextObj.Chekedarray[j]["EmployeeId"]) {
                            if (contextObj.itemsSource[i]["ObjectId"] == contextObj.Chekedarray[j]["ObjectId"]) {
                                contextObj.itemsSource[i]["Select"] = true;
                            }
                        }
                    }
                }
                tempPreviousarray = contextObj.Chekedarray.concat(contextObj.itemsSource);
                var Tempid = [];
                var uniquesData = [];
                var index;
                for (var i = 0; i < tempPreviousarray.length; i++) {
                    index = Tempid.indexOf(tempPreviousarray[i].ObjectId);
                    if (index == -1) {
                        Tempid.push(tempPreviousarray[i].ObjectId);
                        uniquesData.push(tempPreviousarray[i]);
                    } else {
                        uniquesData[index].DIFF += tempPreviousarray[i].DIFF;
                    }
                }
                tempPreviousarray = uniquesData;
                contextObj.itemsSource = tempPreviousarray;
                contextObj.itemsSource = tempPreviousarray.filter(function (item) { return (item["EmployeeId"] == contextObj.selectedId) });               
            }         
            if (contextObj.UnchekedChekedarray != undefined && contextObj.UnchekedChekedarray.length > 0 && contextObj.itemsSource.length > 0) {
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    for (var j = 0; j < contextObj.UnchekedChekedarray.length; j++) {
                        if (contextObj.itemsSource[i]["EmployeeId"] == contextObj.UnchekedChekedarray[j]["EmployeeId"]) {
                            if (contextObj.itemsSource[i]["ObjectId"] == contextObj.UnchekedChekedarray[j]["ObjectId"]) {
                                if (contextObj.itemsSource[i]["Select"] == contextObj.UnchekedChekedarray[j]["Select"]) {
                                    contextObj.itemsSource[i]["Select"] = true;
                                }
                                else {
                                    contextObj.itemsSource[i]["Select"] = false;
                                }
                            }
                        }
                    }
                }
            } 
        });
    }
    chkBoxClick(colVal) {
        var contextObj = this;
        contextObj.resourcesfordisconnection = contextObj.resourcesfordisconnection.concat(colVal.dataSource);
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.concat(colVal.dataSource);       
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.filter(function (item) { return (item["Select"] == true && item["Select"] != undefined) });        
        contextObj.resourcesfordisconnection = contextObj.resourcesfordisconnection.filter(function (item) { return (item["Select"] == false) });
        contextObj.UnchekedChekedarray = contextObj.resourcesfordisconnection.filter(function (item) { return (item["ForEmployeeId"] != "Null") });
        for (var i = 0; i < colVal.dataSource.length; i++) {
            for (var j = 0; j < contextObj.UnchekedChekedarray.length; j++) {
                if (colVal.dataSource[i]["EmployeeId"] == contextObj.UnchekedChekedarray[j]["EmployeeId"]) {
                    if (colVal.dataSource[i]["ObjectId"] == contextObj.UnchekedChekedarray[j]["ObjectId"]) {
                        if (colVal.dataSource[i]["Select"] == contextObj.UnchekedChekedarray[j]["Select"]) {
                            contextObj.UnchekedChekedarray[j]["Select"] = false;
                        }
                        else {
                            contextObj.UnchekedChekedarray[j]["Select"] = true;
                        }
                    }
                }
            }
        }
        var ObjectId = [];
        var uniquesData = [];
        var index;
        for (var i = 0; i < contextObj.itemsSourceFormultiplemove.length; i++) {
            index = ObjectId.indexOf(contextObj.itemsSourceFormultiplemove[i].ObjectId);
            if (index == -1) {
                ObjectId.push(contextObj.itemsSourceFormultiplemove[i].ObjectId);
                uniquesData.push(contextObj.itemsSourceFormultiplemove[i]);
            } else {
                uniquesData[index].DIFF += contextObj.itemsSourceFormultiplemove[i].DIFF;
            }
        }
        contextObj.itemsSourceFormultiplemove = uniquesData;
        contextObj.Chekedarray = contextObj.itemsSourceFormultiplemove;
        contextObj.arrayforcancel = colVal.dataSource;       
        contextObj.AfterCancel.emit({ data: contextObj.arrayforcancel });           
          
    }
    moveresources(event: any) {
        var contextObj = this; 
        var Sucsess = 0;  
        var hasSelectedIds: boolean = false;
        var moveresourceList = new Array<ReportFieldArray>();
        var moveresourceListforapprovalprocess = new Array<Arrayforapprovalprocess>();
        var resources = new Array<Deleteresources>();
        moveresourceListforapprovalprocess = [];
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0) {
            //if (contextObj.IsApprovalneedforempmove == false)
            //    contextObj.employeeresoursestatus.emit({ status: "Multimove" });
            //else
                this.Multiplerecourcemove();
        //    setTimeout(function () {            
        ////if (contextObj.IsNeedToUpdateSource == true) {
        //    //if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0) {
        //        for (let i = 0; i < contextObj.employeemultiplemove.length; i++) {
        //            resources = [];
        //            moveresourceList = [];
        //            hasSelectedIds = false;
        //            if (contextObj.itemsSourceFormultiplemove.length > 0) {
        //                for (let j = 0; j < contextObj.itemsSourceFormultiplemove.length; j++) {
        //                    if (contextObj.itemsSourceFormultiplemove[j]["Select All"] == true && contextObj.itemsSourceFormultiplemove[j]["Select All"] != undefined) {
        //                        if (contextObj.employeemultiplemove[i].Id == contextObj.itemsSourceFormultiplemove[j]["EmployeeId"]) {
        //                            hasSelectedIds = true;
        //                            moveresourceList.push({
        //                                ReportFieldId: 656,
        //                                Value: contextObj.itemsSourceFormultiplemove[j].ObjectId.toString()
        //                            });
        //                        }
        //                    }
        //                    //else {
        //                    //    if (contextObj.resourcesfordisconnection[i]["ForEmployeeId"] != "Null") {
        //                    //        resources.push({
        //                    //            ReportFieldId: 865,
        //                    //            Value: contextObj.resourcesfordisconnection[i].ObjectId.toString()
        //                    //        });
        //                    //    }
        //                    //}
        //                }
        //            }    
        //            //if (contextObj.resourcesfordisconnection.length > 0) {
        //            //    for (let k = 0; k < contextObj.resourcesfordisconnection.length; k++) {
        //            //        if (contextObj.resourcesfordisconnection[k]["ForEmployeeId"] != "Null") {
        //            //            if (contextObj.resourcesfordisconnection[k]["EmployeeId"] == contextObj.employeemultiplemove[i].Id){
        //            //                resources.push({
        //            //                    ReportFieldId: 865,
        //            //                    Value: contextObj.resourcesfordisconnection[k].ObjectId.toString()
        //            //                });
        //            //        }
        //            //        }
        //            //    }
        //            //}               
        //            if (hasSelectedIds == true) {
        //                moveresourceList.push({
        //                    ReportFieldId: 866,
        //                    Value: contextObj.employeemultiplemove[i].Id.toString()
        //                });
        //            }
        //            //if (moveresourceList.length > 0) {
        //                contextObj.EmployeeService.submitmoveresourcedata(JSON.stringify(moveresourceList), 0).subscribe(function (resultData) {
        //                    if (resultData["Data"].StatusId >= 0) {
        //                        Sucsess++;
        //                    }
        //                    if (Sucsess == contextObj.employeemultiplemove.length) {
        //                        contextObj.notificationService.ShowToaster("Resource for move updated", 3);
        //                        contextObj.IsResourceOpened.emit({ status: "0" });
        //                    }
        //                });
        //            //}
        //            //if (contextObj.resourcesfordisconnection != undefined && contextObj.resourcesfordisconnection.length > 0 && resources.length > 0) {
        //            //    contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.employeemultiplemove[i].Id).subscribe(function (resultData) {
        //            //    });
        //            //}                       
        //        } 
        //        for (let i = 0; i < contextObj.employeemultiplemove.length; i++) {
        //            resources = [];
        //            if (contextObj.resourcesfordisconnection.length > 0) {
        //                for (let k = 0; k < contextObj.resourcesfordisconnection.length; k++) {
        //                    if (contextObj.resourcesfordisconnection[k]["ForEmployeeId"] != "Null") {
        //                        if (contextObj.resourcesfordisconnection[k]["EmployeeId"] == contextObj.employeemultiplemove[i].Id) {
        //                            resources.push({
        //                                ReportFieldId: 865,
        //                                Value: contextObj.resourcesfordisconnection[k].ObjectId.toString()
        //                            });
        //                        }
        //                    }
        //                }
        //            } 
        //            if (contextObj.resourcesfordisconnection != undefined && contextObj.resourcesfordisconnection.length > 0 && resources.length > 0) {
        //                contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.employeemultiplemove[i].Id).subscribe(function (resultDatafordelete) {
        //                    resources = [];
        //                });
        //            }                
        //        }   


        //    //}
        //}, 7000);    
        }
        else {
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select"] == true && contextObj.itemsSource[i]["Select"] != undefined) {
                    hasSelectedIds = true;
                    moveresourceList.push({
                        ReportFieldId: 656,
                        Value: contextObj.itemsSource[i].ObjectId.toString()
                    });
                    moveresourceListforapprovalprocess.push({
                        EmployeeId: contextObj.itemsSource[0].EmployeeId.toString(),
                        ObjectId: contextObj.itemsSource[i].ObjectId.toString()
                    });
                }
                else {
                    if (contextObj.itemsSource[i]["ForEmployeeId"] != "Null") {
                        resources.push({
                            ReportFieldId: 865,
                            Value: contextObj.itemsSource[i].ObjectId.toString()
                        });
                    }
                }
            }
            if (hasSelectedIds == true) {
                moveresourceList.push({
                    ReportFieldId: 866,
                    Value: contextObj.itemsSource[0].EmployeeId.toString()
                });
                //moveresourceListforapprovalprocess.push({
                //    ReportFieldId: 7392,
                //    Value: contextObj.itemsSource[0].EmployeeId.toString()
                //});
            }
            //if (contextObj.IsApprovalneedforempmove == false) {
            //    contextObj.EmployeeService.submitmoveresourcedata(JSON.stringify(moveresourceList), 0).subscribe(function (resultData) {
            //        if (resultData["Data"].StatusId >= 0) {
            //            contextObj.notificationService.ShowToaster("Resource for move updated", 3);
            //            contextObj.employeeresoursestatus.emit({ status: "success" });
            //            contextObj.IsResourceOpened.emit({ status: "0" });
            //        }
            //    });
            //}
            //else {              
                contextObj.ResourceforApprovalprocess.emit({ Resourcedata: moveresourceListforapprovalprocess });
                contextObj.IsResourceOpened.emit({ status: "0" });
            //}
            if (resources != undefined && resources.length > 0) {
                contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.selectedId).subscribe(function (resultData) {
                });
            }
        }
       
    }
    public Multiplerecourcemove() {
        var contextObj = this;
        var Sucsess = 0;
        var Resourceforapproval = 0;
        var hasSelectedIds: boolean = false;
        var moveresourceList = new Array<ReportFieldArray>();
        var resources = new Array<Deleteresources>();      
        var moveresourceListforapprovalprocess = new Array<Arrayforapprovalprocess>();  
        moveresourceListforapprovalprocess = [];     
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.filter(function (item) { return (item["Select"] == true && item["Select"] != undefined) });  
        var ObjectId = [];
        var uniquesData = [];
        var index;
        for (var i = 0; i < contextObj.itemsSourceFormultiplemove.length; i++) {
            index = ObjectId.indexOf(contextObj.itemsSourceFormultiplemove[i].ObjectId);
            if (index == -1) {
                ObjectId.push(contextObj.itemsSourceFormultiplemove[i].ObjectId);
                uniquesData.push(contextObj.itemsSourceFormultiplemove[i]);
            } else {
                uniquesData[index].DIFF += contextObj.itemsSourceFormultiplemove[i].DIFF;
            }
        }
        contextObj.itemsSourceFormultiplemove = uniquesData;           
            for (let i = 0; i < contextObj.employeemultiplemove.length; i++) {
                resources = [];
                moveresourceList = [];               
                hasSelectedIds = false;
                if (contextObj.itemsSourceFormultiplemove.length > 0) {
                    for (let j = 0; j < contextObj.itemsSourceFormultiplemove.length; j++) {
                        if (contextObj.itemsSourceFormultiplemove[j]["Select"] == true && contextObj.itemsSourceFormultiplemove[j]["Select"] != undefined) {
                            if (contextObj.employeemultiplemove[i].Id == contextObj.itemsSourceFormultiplemove[j]["EmployeeId"]) {
                                hasSelectedIds = true;
                                moveresourceList.push({
                                    ReportFieldId: 656,
                                    Value: contextObj.itemsSourceFormultiplemove[j].ObjectId.toString()
                                });
                                moveresourceListforapprovalprocess.push({
                                    EmployeeId: contextObj.employeemultiplemove[i].Id.toString(),
                                    ObjectId: contextObj.itemsSourceFormultiplemove[j].ObjectId.toString()
                                });
                            }
                        }
                        //else {
                        //    if (contextObj.resourcesfordisconnection[i]["ForEmployeeId"] != "Null") {
                        //        resources.push({
                        //            ReportFieldId: 865,
                        //            Value: contextObj.resourcesfordisconnection[i].ObjectId.toString()
                        //        });
                        //    }
                        //}
                    }
                }
                //if (contextObj.resourcesfordisconnection.length > 0) {
                //    for (let k = 0; k < contextObj.resourcesfordisconnection.length; k++) {
                //        if (contextObj.resourcesfordisconnection[k]["ForEmployeeId"] != "Null") {
                //            if (contextObj.resourcesfordisconnection[k]["EmployeeId"] == contextObj.employeemultiplemove[i].Id){
                //                resources.push({
                //                    ReportFieldId: 865,
                //                    Value: contextObj.resourcesfordisconnection[k].ObjectId.toString()
                //                });
                //        }
                //        }
                //    }
                //}               
                if (hasSelectedIds == true) {
                    moveresourceList.push({
                        ReportFieldId: 866,
                        Value: contextObj.employeemultiplemove[i].Id.toString()
                    });
                }
                //if (contextObj.IsApprovalneedforempmove == false) {
                //    contextObj.EmployeeService.submitmoveresourcedata(JSON.stringify(moveresourceList), 0).subscribe(function (resultData) {
                //        if (resultData["Data"].StatusId >= 0) {
                //            Sucsess++;
                //        }
                //        if (Sucsess == contextObj.employeemultiplemove.length) {
                //            contextObj.notificationService.ShowToaster("Resource for move updated", 3);
                //            contextObj.employeeresoursestatus.emit({ status: "success" });
                //            contextObj.IsResourceOpened.emit({ status: "0" });

                //        }
                //    });
                //}
                //else {
                    Resourceforapproval++;
                    if (Resourceforapproval == contextObj.employeemultiplemove.length) {                       
                        contextObj.ResourceforApprovalprocess.emit({ Resourcedata: moveresourceListforapprovalprocess });
                        contextObj.IsResourceOpened.emit({ status: "0" });

                    }
                //}
                //if (contextObj.resourcesfordisconnection != undefined && contextObj.resourcesfordisconnection.length > 0 && resources.length > 0) {
                //    contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.employeemultiplemove[i].Id).subscribe(function (resultData) {
                //    });
                //}                       
            }
            for (let i = 0; i < contextObj.employeemultiplemove.length; i++) {
                resources = [];
                if (contextObj.resourcesfordisconnection.length > 0) {
                    for (let k = 0; k < contextObj.resourcesfordisconnection.length; k++) {
                        if (contextObj.resourcesfordisconnection[k]["ForEmployeeId"] != "Null") {
                            if (contextObj.resourcesfordisconnection[k]["EmployeeId"] == contextObj.employeemultiplemove[i].Id) {
                                resources.push({
                                    ReportFieldId: 865,
                                    Value: contextObj.resourcesfordisconnection[k].ObjectId.toString()
                                });
                            }
                        }
                    }
                }
                if (contextObj.resourcesfordisconnection != undefined && contextObj.resourcesfordisconnection.length > 0 && resources.length > 0) {
                    contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.employeemultiplemove[i].Id).subscribe(function (resultDatafordelete) {
                        resources = [];
                    });
                }
            }        
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface Deleteresources {
    ReportFieldId: number;
    Value: string;
}
export interface Arrayforapprovalprocess {
    EmployeeId: string;
    ObjectId: string;
}