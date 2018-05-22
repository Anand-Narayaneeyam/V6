var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var SelectReocourceForEmployeeMove = (function () {
    function SelectReocourceForEmployeeMove(EmployeeService, notificationService, generFun, cdr, http) {
        this.EmployeeService = EmployeeService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.cdr = cdr;
        this.http = http;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 300;
        this.listtarget = 1;
        this.totalItems = 0;
        this.count = 0;
        this.itemsPerPage = 100;
        this.pageIndex = 0;
        this.hasFieldValue = false;
        this.employeeresoursestatus = new core_1.EventEmitter();
        this.IsResourceOpened = new core_1.EventEmitter();
        this.AfterCancel = new core_1.EventEmitter();
        this.ResourceforApprovalprocess = new core_1.EventEmitter();
        this.isinUse = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "[]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    SelectReocourceForEmployeeMove.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.EmployeeService.getRecourcedatafieldsforemployeemove().subscribe(function (resultdata) {
            contextObj.fieldObject = resultdata["Data"];
            contextObj.fieldObject[1].FieldLabel = "Select";
            contextObj.dataLoad();
        });
    };
    SelectReocourceForEmployeeMove.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes['IsNeedToUpdateSource'] && changes['IsNeedToUpdateSource']['currentValue']) {
            if (changes['IsNeedToUpdateSource']['currentValue'] == true) {
                this.Multiplerecourcemove();
            }
        }
    };
    SelectReocourceForEmployeeMove.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.Target = 1;
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0) {
            contextObj.Target = 2;
            contextObj.selectedId = contextObj.employeemultiplemove[0].Id;
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
                    var Previousbutton = document.getElementById("Previous");
                    Previousbutton.className = "Disablebutton";
                }
            }
        });
    };
    SelectReocourceForEmployeeMove.prototype.Next = function (event) {
        var contextObj = this;
        var tempNextarray = new Array();
        var Nextbutton = document.getElementById("Next");
        var Previousbutton = document.getElementById("Previous");
        Previousbutton.disabled = false;
        Previousbutton.className = "Savebutton";
        //contextObj.Chekedarray = contextObj.itemsSource.filter(function (item) { return (item["Select All"] == true && item["Select All"] != undefined) });
        //contextObj.UnchekedChekedarray = contextObj.itemsSource.filter(function (item) { return (item["Select All"] == false) });
        if (contextObj.count == undefined)
            contextObj.count = 0;
        else if (contextObj.employeemultiplemove.length < contextObj.count)
            contextObj.count = contextObj.employeemultiplemove.length;
        if (contextObj.count < contextObj.employeemultiplemove.length - 1)
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
                    }
                    else {
                        uniquesData[index].DIFF += tempNextarray[i].DIFF;
                    }
                }
                tempNextarray = uniquesData;
                contextObj.itemsSource = tempNextarray;
                contextObj.itemsSource = tempNextarray.filter(function (item) { return (item["EmployeeId"] == contextObj.selectedId); });
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
    };
    SelectReocourceForEmployeeMove.prototype.previous = function (event) {
        var contextObj = this;
        var Nextbutton = document.getElementById("Next");
        var Previousbutton = document.getElementById("Previous");
        Nextbutton.disabled = false;
        Nextbutton.className = "Savebutton";
        var tempPreviousarray = new Array();
        if (contextObj.count == undefined)
            contextObj.count = 0;
        else if (contextObj.employeemultiplemove.length < contextObj.count)
            contextObj.count = contextObj.employeemultiplemove.length;
        if (contextObj.count > 0)
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
                    }
                    else {
                        uniquesData[index].DIFF += tempPreviousarray[i].DIFF;
                    }
                }
                tempPreviousarray = uniquesData;
                contextObj.itemsSource = tempPreviousarray;
                contextObj.itemsSource = tempPreviousarray.filter(function (item) { return (item["EmployeeId"] == contextObj.selectedId); });
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
    };
    SelectReocourceForEmployeeMove.prototype.chkBoxClick = function (colVal) {
        var contextObj = this;
        contextObj.resourcesfordisconnection = contextObj.resourcesfordisconnection.concat(colVal.dataSource);
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.concat(colVal.dataSource);
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.filter(function (item) { return (item["Select"] == true && item["Select"] != undefined); });
        contextObj.resourcesfordisconnection = contextObj.resourcesfordisconnection.filter(function (item) { return (item["Select"] == false); });
        contextObj.UnchekedChekedarray = contextObj.resourcesfordisconnection.filter(function (item) { return (item["ForEmployeeId"] != "Null"); });
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
            }
            else {
                uniquesData[index].DIFF += contextObj.itemsSourceFormultiplemove[i].DIFF;
            }
        }
        contextObj.itemsSourceFormultiplemove = uniquesData;
        contextObj.Chekedarray = contextObj.itemsSourceFormultiplemove;
        contextObj.arrayforcancel = colVal.dataSource;
        contextObj.AfterCancel.emit({ data: contextObj.arrayforcancel });
    };
    SelectReocourceForEmployeeMove.prototype.moveresources = function (event) {
        var contextObj = this;
        var Sucsess = 0;
        var hasSelectedIds = false;
        var moveresourceList = new Array();
        var moveresourceListforapprovalprocess = new Array();
        var resources = new Array();
        moveresourceListforapprovalprocess = [];
        if (contextObj.employeemultiplemove != undefined && contextObj.employeemultiplemove.length > 0) {
            //if (contextObj.IsApprovalneedforempmove == false)
            //    contextObj.employeeresoursestatus.emit({ status: "Multimove" });
            //else
            this.Multiplerecourcemove();
        }
        else {
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
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
    };
    SelectReocourceForEmployeeMove.prototype.Multiplerecourcemove = function () {
        var contextObj = this;
        var Sucsess = 0;
        var Resourceforapproval = 0;
        var hasSelectedIds = false;
        var moveresourceList = new Array();
        var resources = new Array();
        var moveresourceListforapprovalprocess = new Array();
        moveresourceListforapprovalprocess = [];
        contextObj.itemsSourceFormultiplemove = contextObj.itemsSourceFormultiplemove.filter(function (item) { return (item["Select"] == true && item["Select"] != undefined); });
        var ObjectId = [];
        var uniquesData = [];
        var index;
        for (var i = 0; i < contextObj.itemsSourceFormultiplemove.length; i++) {
            index = ObjectId.indexOf(contextObj.itemsSourceFormultiplemove[i].ObjectId);
            if (index == -1) {
                ObjectId.push(contextObj.itemsSourceFormultiplemove[i].ObjectId);
                uniquesData.push(contextObj.itemsSourceFormultiplemove[i]);
            }
            else {
                uniquesData[index].DIFF += contextObj.itemsSourceFormultiplemove[i].DIFF;
            }
        }
        contextObj.itemsSourceFormultiplemove = uniquesData;
        for (var i_1 = 0; i_1 < contextObj.employeemultiplemove.length; i_1++) {
            resources = [];
            moveresourceList = [];
            hasSelectedIds = false;
            if (contextObj.itemsSourceFormultiplemove.length > 0) {
                for (var j = 0; j < contextObj.itemsSourceFormultiplemove.length; j++) {
                    if (contextObj.itemsSourceFormultiplemove[j]["Select"] == true && contextObj.itemsSourceFormultiplemove[j]["Select"] != undefined) {
                        if (contextObj.employeemultiplemove[i_1].Id == contextObj.itemsSourceFormultiplemove[j]["EmployeeId"]) {
                            hasSelectedIds = true;
                            moveresourceList.push({
                                ReportFieldId: 656,
                                Value: contextObj.itemsSourceFormultiplemove[j].ObjectId.toString()
                            });
                            moveresourceListforapprovalprocess.push({
                                EmployeeId: contextObj.employeemultiplemove[i_1].Id.toString(),
                                ObjectId: contextObj.itemsSourceFormultiplemove[j].ObjectId.toString()
                            });
                        }
                    }
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
                    Value: contextObj.employeemultiplemove[i_1].Id.toString()
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
        }
        for (var i_2 = 0; i_2 < contextObj.employeemultiplemove.length; i_2++) {
            resources = [];
            if (contextObj.resourcesfordisconnection.length > 0) {
                for (var k = 0; k < contextObj.resourcesfordisconnection.length; k++) {
                    if (contextObj.resourcesfordisconnection[k]["ForEmployeeId"] != "Null") {
                        if (contextObj.resourcesfordisconnection[k]["EmployeeId"] == contextObj.employeemultiplemove[i_2].Id) {
                            resources.push({
                                ReportFieldId: 865,
                                Value: contextObj.resourcesfordisconnection[k].ObjectId.toString()
                            });
                        }
                    }
                }
            }
            if (contextObj.resourcesfordisconnection != undefined && contextObj.resourcesfordisconnection.length > 0 && resources.length > 0) {
                contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.employeemultiplemove[i_2].Id).subscribe(function (resultDatafordelete) {
                    resources = [];
                });
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SelectReocourceForEmployeeMove.prototype, "selectedId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SelectReocourceForEmployeeMove.prototype, "employeemultiplemove", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SelectReocourceForEmployeeMove.prototype, "IsNeedToUpdateSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SelectReocourceForEmployeeMove.prototype, "IsApprovalneedforempmove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectReocourceForEmployeeMove.prototype, "employeeresoursestatus", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectReocourceForEmployeeMove.prototype, "IsResourceOpened", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectReocourceForEmployeeMove.prototype, "AfterCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectReocourceForEmployeeMove.prototype, "ResourceforApprovalprocess", void 0);
    SelectReocourceForEmployeeMove = __decorate([
        core_1.Component({
            selector: 'SelectReocource-ForEmployeeMove',
            templateUrl: './app/Views/Employee/Data/selectResourcesForEmployeeMove.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions, core_1.ChangeDetectorRef, http_1.Http])
    ], SelectReocourceForEmployeeMove);
    return SelectReocourceForEmployeeMove;
}());
exports.SelectReocourceForEmployeeMove = SelectReocourceForEmployeeMove;
//# sourceMappingURL=selectResourcesForEmployeeMove.js.map