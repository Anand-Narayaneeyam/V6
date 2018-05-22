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
var ng2_dnd_1 = require('../../../FrameWork/ExternalLibraries/dnd/ng2-dnd');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var orgwiseemployee_grid_component_1 = require('./orgwiseemployee-grid.component');
var ViewStacktComponent = (function () {
    function ViewStacktComponent(empService, notificationService, adminService, elRef) {
        this.empService = empService;
        this.notificationService = notificationService;
        this.adminService = adminService;
        this.elRef = elRef;
        this.retSaveStack = new core_1.EventEmitter();
        this.isContextMenu = false;
        this.OrgNamefornew = "";
        this.imageName = "";
        this.tileclassname = "";
        this.moved = false;
        this.sectarget = 0;
        //btnName: string = "";
        this.lstOrgUnits = [];
        this.level = 0;
        this.MaxSeatingCapacity = 0;
        this.calcwidthFun = true;
        this.blndropEnable = true;
        this.btnSave = "Save";
        this.pageTitle = "";
        this.isSubmit = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    }
    ViewStacktComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["stackPlanDetailsId"]) {
            this.loadStackSrc();
        }
    };
    ViewStacktComponent.prototype.loadStackSrc = function () {
        var contextObj = this;
        if (contextObj.stackPlanDetailsId == undefined) {
            contextObj.stackPlanDetailsId = 0;
        }
        if (contextObj.stackPlanDetailsId == 0) {
            contextObj.btnSave = "Save";
        }
        else {
            contextObj.btnSave = "Save Changes";
        }
        this.empService.GetEmployeeSpacePlanningStackOccupancyDetails(contextObj.prjtId, contextObj.stackPlanDetailsId).subscribe(function (result) {
            contextObj.FloorwiseOrgData = JSON.parse(result.Table1);
            contextObj.OrgwiseGroup = JSON.parse(result.Table2);
            contextObj.OrgNamefornew = JSON.parse(result.Table3)[0].L1Caption;
            contextObj.getMaxSeatCapacity(1, contextObj.FloorwiseOrgData);
            for (var i = 0; i < contextObj.FloorwiseOrgData.length; i++) {
                contextObj.FloorwiseOrgData[i]['OrgUnit'] = contextObj.filterOrgwiseGroup(contextObj.FloorwiseOrgData[i]['FloorId']);
            }
        });
        //this.adminService.getOrganizationalStructureFields(34).subscribe(function (resultData) {
        //});
        this.empService.getOrganizationalStructureFields().subscribe(function (resultData) {
            if (resultData != "") {
                contextObj.GetOrgUnitNames(JSON.parse(resultData));
            }
        });
    };
    ViewStacktComponent.prototype.GetOrgUnitNames = function (objData) {
        var obj = Object.values(objData[0]);
        for (var i = 1; i < obj.length; i++) {
            this.lstOrgUnits.push(obj[i]);
            this.level++;
        }
    };
    ViewStacktComponent.prototype.calculateWidth = function (orgDetails, floordata, target) {
        var minwidth = 25;
        var newSeatingCapacity = 0;
        var context = this;
        //var tdwidth = this.elRef.nativeElement.getBoundingClientRect().width; 
        var tdwidth = this.elRef.nativeElement.getBoundingClientRect().width; //$(".stacklist").width();       
        var MaxSeatingCapacity = this.MaxSeatingCapacity; //this.getMaxSeatCapacity(1, floorData);
        var Unitwidth = tdwidth / MaxSeatingCapacity;
        var MinSeats = minwidth / Unitwidth;
        var K = [];
        for (var pNode = 0; pNode < this.FloorwiseOrgData.length; pNode++) {
            var filterdOrgDetails = this.FloorwiseOrgData[pNode]['OrgUnit']; //this.filterOrgwiseGroup(this.FloorwiseOrgData[pNode].FloorId);
            var minwidthcount = 0, TotalminSeatcount = 0;
            for (var divNode = 0; divNode < filterdOrgDetails.length; divNode++) {
                var seats = 0;
                if (Object.getOwnPropertyNames(filterdOrgDetails[divNode]).length == 0) {
                    seats = this.FloorwiseOrgData[pNode]['FreeSeat'] > "0" ? parseInt(this.FloorwiseOrgData[pNode]['FreeSeat']) : 0;
                }
                else {
                    seats = filterdOrgDetails[divNode]["Seats"];
                }
                if (seats < MinSeats) {
                    minwidthcount++;
                    TotalminSeatcount = TotalminSeatcount + seats;
                }
            }
            K.push((this.getMaxSeatCapacity(2, this.FloorwiseOrgData[pNode]) - TotalminSeatcount) + (minwidthcount * MinSeats));
        }
        newSeatingCapacity = Math.max.apply(null, K);
        var newseat = 0;
        var newUnitWidth = 0;
        var orgseat = 0;
        newUnitWidth = tdwidth / newSeatingCapacity;
        if (target == 1)
            orgseat = floordata['FreeSeat'];
        else
            orgseat = orgDetails["Seats"];
        if (MinSeats > orgseat) {
            newseat = MinSeats;
        }
        else {
            newseat = orgseat;
        }
        var divwidth = newseat * newUnitWidth;
        console.log("divwidth", divwidth);
        return divwidth;
    };
    //getCalculatewidth(orgDetails, newSeatingCapacity,target) {            
    //    var newseat = 0;
    //    debugger
    //    var newUnitWidth = 0;
    //    newUnitWidth =this.tdwidth /newSeatingCapacity;
    //    if (this.MinSeats > orgDetails["Seats"]) {
    //        newseat = this.MinSeats;
    //    }
    //    else {
    //        newseat = orgDetails["Seats"];
    //    }
    //    var divwidth = newseat * newUnitWidth;
    //    return divwidth.toString();       
    //}
    ViewStacktComponent.prototype.getMaxSeatCapacity = function (target, flrData) {
        var tempmaxs = 0, maxcap = 0;
        if (target == 1) {
            for (var i = 0; i < flrData.length; i++) {
                if (flrData[i]["OccupiedSeat"] > flrData[i]["Seating Capacity"]) {
                    tempmaxs = flrData[i]["OccupiedSeat"];
                }
                else {
                    tempmaxs = flrData[i]["Seating Capacity"];
                }
                if (tempmaxs > maxcap) {
                    maxcap = tempmaxs;
                }
            }
            this.MaxSeatingCapacity = maxcap;
        }
        else {
            if (flrData["OccupiedSeat"] > flrData["Seating Capacity"]) {
                maxcap = flrData["OccupiedSeat"];
            }
            else {
                maxcap = flrData["Seating Capacity"];
            }
        }
        return maxcap;
    };
    ViewStacktComponent.prototype.filterOrgwiseGroup = function (floorId) {
        var filteredData = this.OrgwiseGroup.filter(function (el) {
            return el.FloorId == floorId;
        });
        filteredData.push({});
        return filteredData;
    };
    ViewStacktComponent.prototype.freeSeatsStyleClass = function (FlrFreeSeat) {
        var clsName = "";
        if (FlrFreeSeat > 0) {
            clsName = "Vaccancy";
        }
        else if (FlrFreeSeat < 0) {
            clsName = "OverOccup";
        }
        else {
            clsName = "NominalOccup";
        }
        return clsName;
        ;
    };
    ViewStacktComponent.prototype.freeSeatsStyleArrowClass = function (FlrFreeSeat) {
        var arrowClass = "";
        if (FlrFreeSeat < 0) {
            arrowClass = "OverOccup-arrow-up";
        }
        return arrowClass;
    };
    ViewStacktComponent.prototype.getSeatingCapacity = function (FlrFreeSeat) {
        var textforcapacity = "";
        if (FlrFreeSeat < 0) {
            textforcapacity = "Over: " + Math.abs(FlrFreeSeat);
        }
        return textforcapacity;
    };
    ViewStacktComponent.prototype.setColor = function (colorId) {
        return "#" + colorId;
    };
    ViewStacktComponent.prototype.geVaccantclass = function (freeseats) {
        if (freeseats > 0)
            return "tileVaccant";
        else
            return "zeroVaccant";
    };
    ViewStacktComponent.prototype.gettileclass = function (statusId, blnHasSplit, target, orgUnitSeats) {
        var imageName = "";
        var tileclassname = "";
        if (orgUnitSeats == 0) {
            return "zeroOrgUnit";
        }
        else {
            switch (statusId) {
                case 57:
                    imageName = "Content/StackPlan/move.png";
                    tileclassname = "tile";
                    break;
                case 4:
                    imageName = "Content/StackPlan/deleted.png";
                    tileclassname = "Removed";
                    break;
                case 52:
                    imageName = "Content/StackPlan/freeze.png";
                    tileclassname = "Freeze";
                    break;
                case 56:
                    imageName = "Content/StackPlan/neworg.png";
                    tileclassname = "tileproposed";
                    break;
                case 8:
                    if (blnHasSplit) {
                        imageName = "Content/StackPlan/split.png";
                    }
                    else {
                        imageName = "Content/StackPlan/null.png";
                    }
                    tileclassname = "tile";
                    break;
            }
            tileclassname = tileclassname;
            if (target == 1) {
                return tileclassname;
            }
            else
                return imageName;
        }
    };
    ViewStacktComponent.prototype.setDeptName = function (orgdetails) {
        var deptName = "";
        switch (this.level) {
            case 1:
                deptName = this.lstOrgUnits[0] + ": " + orgdetails["Level1"];
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                deptName = this.lstOrgUnits[0] + ": " + orgdetails["Level1"];
                if (orgdetails["Level2"].trim().Length > 0)
                    deptName += "\n" + this.lstOrgUnits[1] + ": " + orgdetails["Level2"];
                break;
        }
        if (orgdetails["Moved"]) {
            deptName += "\n" + "Moved From: " + orgdetails["SourceSiteName"] + ", " + orgdetails["SourceBuildingName"] + ", " + orgdetails["SourceFloorName"];
        }
        return deptName;
    };
    ViewStacktComponent.prototype.rightclickdiv = function (events) {
        events.preventDefault();
        //var dd = $(this);
        var split = true, freeze = true, remove = true, restore = false, defreeze = false;
        //var clsName = "";
        //g_event = events;
        //if (g_event.childNodes[1].attributes[0].nodeValue != "" && g_event.childNodes[1].attributes[0].nodeValue != null) {
        //    clsName = g_event.childNodes[1].attributes[0].nodeValue.split("/")[3].split(".")[0];
        //    if (clsName == "deleted") {
        //        split = false, freeze = false, remove = false, restore = true;
        //    }
        //    else if (clsName == "freeze") {
        //        split = false, freeze = false, remove = false, defreeze = true;
        //    }
        //    else if (clsName == "move") {
        //        split = false, freeze = false, remove = false;
        //    }
        //    else if (clsName == "neworg") {
        //        split = false;
        //        freeze = false;
        //    }
        //}
        //if (parseInt(g_event.childNodes[0].childNodes[0].innerText) < 2) {
        //    split = false;
        //}
        if (events.which === 3) {
            this.contextmenus(split, remove, freeze, restore, defreeze, events);
        }
    };
    ViewStacktComponent.prototype.contextmenus = function (split, remove, freeze, restore, defreeze, event) {
        this.isContextMenu = true;
        //document.getElementById("rmenu").className = "show";
        //document.getElementById("rmenu").innerHTML = "";
        //var strBuildMenu = "";
        //if (split) {
        //    strBuildMenu = "<div id='divSplit'> <a href='#' onclick='Split()'> Split </a></div>";
        //}
        //else {
        //    $("rmenu").prop("height", "40px");
        //}
        //if (remove) {
        //    strBuildMenu += "<div id='divRemove'> <a href='#' onclick='Remove(1)'> Remove </a></div>";
        //}
        //else if (restore) {
        //    strBuildMenu += "<div id='divRemove'> <a href='#' onclick='Remove(2)'> Restore </a></div>";
        //}
        //if (freeze) {
        //    strBuildMenu += "<div id='divFreeze'> <a href='#' onclick='Freeze(1)'> Freeze </a></div>";
        //}
        //else if (defreeze) {
        //    strBuildMenu += "<div id='divFreeze'> <a href='#' onclick='Freeze(2)'> Defreeze </a></div>";
        //$("rmenu").prop("height", "20px");
        //}
        //if (strBuildMenu != "") {
        //    document.getElementById("rmenu").innerHTML = strBuildMenu;
        //}
        //else {
        //    document.getElementById("rmenu").className = "hide";
        //}
        //strBuildMenu = "";
        document.getElementById("rmenu").style.top = event.clientY + 'px';
        document.getElementById("rmenu").style.left = (event.clientX - 13) + 'px';
    };
    ViewStacktComponent.prototype.onDragOver = function (event, orgDetails) {
        var context = this;
        var empIds = "";
        var srcFloorId = orgDetails["SourceFloorId"];
        /*context.empService.GetEmployeesNotHavingSeatsPerGradeAndSpaceType(orgDetails['OrgUnitId'], orgDetails['TargetFloor'], srcFloorId, empIds).subscribe(function (result) {
            if (result["Data"]["FieldBinderData"] != "[]") {
                context.sectarget = 1;
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            }
        });*/
    };
    ViewStacktComponent.prototype.strdoubleclick = function (event, orgDetails) {
        //proposed floor -- 56
        var context = this;
        if (orgDetails['StatusId'] != 56) {
            this.pageTitle = "Employees";
            context.empService.GetOrganizationalWiseEmployees(orgDetails['OrgUnitId'], orgDetails['FloorId'], context.prjtId, orgDetails['SourceFloorId']).subscribe(function (result) {
                context.orgWiseEmpSrc = JSON.parse(result["Data"].FieldBinderData);
                context.sectarget = 1;
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            });
        }
    };
    ViewStacktComponent.prototype.saveclick = function () {
        var context = this;
        // this.btnName = "Save";
        this.pageTitle = "";
        var target = 0;
        if (context.stackPlanDetailsId == 0) {
            this.pageTitle = "New Stack Plan";
            target = 1;
        }
        else {
            this.pageTitle = "Edit Stack Plan";
            target = 2;
        }
        this.empService.loadAddEditStack(context.stackPlanDetailsId, this.prjtId, target).subscribe(function (result) {
            context.fieldDtlsSave = result["Data"];
            context.sectarget = 2;
            context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
        });
    };
    ViewStacktComponent.prototype.onSubmitData = function (event) {
        var anticipatedseats = ""; //todo
        var arrJson = { "Data": this.FloorwiseOrgData };
        var floorDetaisJson = JSON.stringify(arrJson);
        var context = this;
        if (this.isSubmit == false) {
            this.isSubmit = true;
            this.empService.addUpdateStackPlanDetails(event, this.prjtId, floorDetaisJson, this.stackPlanDetailsId, anticipatedseats).subscribe(function (result) {
                switch (result["Data"].StatusId) {
                    case -1:
                        context.notificationService.ShowToaster("Stack Plan already exists", 5);
                        break;
                    case 1:
                        var action = "";
                        if (context.stackPlanDetailsId > 0) {
                            context.notificationService.ShowToaster("Stack Plan details updated", 3);
                            action = "edit";
                        }
                        else {
                            context.notificationService.ShowToaster("Stack Plan details added", 3);
                            action = "add";
                        }
                        context.stackPlanDetailsId = -1;
                        context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.retSaveStack.emit({ "returnData": result["Data"].Data[0], "actionName": action });
                        break;
                    case 3:
                        if (result["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Stack Plan already exists", 5);
                        }
                        break;
                    default:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
                context.isSubmit = false;
            });
        }
    };
    ViewStacktComponent.prototype.dropSuccess = function (dragData, drpFloorDta) {
        var context = this;
        var empIds = "";
        var srcFloorId = dragData["SourceFloorId"];
        context.empService.GetEmployeesNotHavingSeatsPerGradeAndSpaceType(dragData['OrgUnitId'], dragData['TargetFloorId'], srcFloorId, empIds).subscribe(function (result) {
            if (result["Data"]["FieldBinderData"] != "[]") {
                context.sectarget = 1;
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            }
        });
        this.UpdateJsonData(dragData, drpFloorDta);
    };
    ViewStacktComponent.prototype.UpdateJsonData = function (draggedData, drpFloorDetls) {
        var srcFloorName = draggedData.SourceFloorName;
        var srcSiteName = draggedData.SourceSiteName;
        var srcBuildingName = draggedData.SourceBuildingName;
        var floorallocatedseats = 0;
        var context = this;
        var count = 2; //for avoid two looping for dropped and droponfloorid settings
        //this.FloorwiseOrgData.find(function (item) {
        var success = false;
        this.FloorwiseOrgData.find(function (item) {
            if ((item["FloorId"] == draggedData.TargetFloorId)) {
                floorallocatedseats = draggedData.Seats;
                if (floorallocatedseats != undefined) {
                    item["AllocatedSeats"] -= floorallocatedseats;
                }
                item["FreeSeat"] = item["FreeSeat"] + draggedData.Seats;
                success = true;
                return true;
            }
            else
                return false;
        });
        if (success) {
            for (var i = 0; i < this.FloorwiseOrgData.length; i++) {
                //if (this.FloorwiseOrgData[i].FloorId == draggedData.FloorId) {
                //    count--;                                 
                //     this.FloorwiseOrgData[i]["AllocatedSeats"] -= floorallocatedseats;
                //     this.FloorwiseOrgData[i]["FreeSeat"] += floorallocatedseats;
                //    // context.setStackInfo(item["FreeSeat"], context);
                //}
                if (this.FloorwiseOrgData[i].FloorId == drpFloorDetls.FloorId) {
                    count--;
                    if (draggedData.SourceFloorId == 0)
                        draggedData.SourceFloorId = drpFloorDetls["FloorId"];
                    if (draggedData.SourceFloorId == drpFloorDetls["FloorId"]) {
                        draggedData.Allocated = 0;
                        draggedData.TargetFloorId = drpFloorDetls["FloorId"];
                        draggedData.Moved = false;
                        draggedData.StatusId = 8;
                        this.FloorwiseOrgData[i].IsAnyChangeMadeFloorwise = false;
                        draggedData.IsAnyChangeMadeOrgwise = false;
                    }
                    else {
                        draggedData.Allocated = draggedData.Seats;
                        draggedData.TargetFloorId = drpFloorDetls["FloorId"];
                        draggedData.Moved = true;
                        draggedData.IsAnyChangeMadeOrgwise = true;
                        draggedData.StatusId = 57;
                        floorallocatedseats = draggedData.Seats;
                        this.FloorwiseOrgData[i].Moved = true;
                        this.FloorwiseOrgData[i].IsAnyChangeMadeFloorwise = true;
                    }
                    if (floorallocatedseats != undefined) {
                        this.FloorwiseOrgData[i]["AllocatedSeats"] += floorallocatedseats;
                    }
                    this.FloorwiseOrgData[i]["FreeSeat"] = this.FloorwiseOrgData[i]["FreeSeat"] - draggedData.Seats;
                }
            }
        }
    };
    /**
     block moving through the vaccant block not visible in UI
     */
    ViewStacktComponent.prototype.ondragEnd = function (flrData, index, sortdata) {
        var emptyObjIndex = -1;
        var withoutemptyObj = flrData['OrgUnit'].filter(function (item, i) {
            if (Object.keys(item).length === 0) {
                emptyObjIndex = i;
            }
            return Object.keys(item).length != 0;
        });
        withoutemptyObj.push(flrData['OrgUnit'][emptyObjIndex]);
        flrData['OrgUnit'] = withoutemptyObj;
    };
    ViewStacktComponent.prototype.setStackInfo = function (freeSeats, context) {
        //var clsname = context.freeSeatsStyleClass(freeSeats);
        //var vacc = context.getSeatingCapacity(freeSeats);
        //var arrowType = context.freeSeatsStyleArrowClass(freeSeats);
        // if (freeSeats<0) remove the vaccant block in the floor ---- not done
    };
    ViewStacktComponent.prototype.dragEna = function (event) {
    };
    ViewStacktComponent.prototype.dropen = function (event) {
    };
    ViewStacktComponent.prototype.dragOver = function (dragData, drpZoneflrId) {
    };
    ViewStacktComponent.prototype.onDrop = function (event, data) {
        return false;
    };
    ViewStacktComponent.prototype.NewOrgclick = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ViewStacktComponent.prototype, "prjtId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ViewStacktComponent.prototype, "stackPlanDetailsId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ViewStacktComponent.prototype, "spacePlaningPrjtStatusId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ViewStacktComponent.prototype, "retSaveStack", void 0);
    ViewStacktComponent = __decorate([
        core_1.Component({
            selector: 'view-stack',
            templateUrl: './app/Views/Employee/Tools/viewstack.component.html',
            directives: [notify_component_1.Notification, ng2_dnd_1.DND_DIRECTIVES, split_view_component_1.SplitViewComponent, orgwiseemployee_grid_component_1.OrgWiseEmpGridComponent, fieldGeneration_component_1.FieldComponent],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, administration_service_1.AdministrationService, ng2_dnd_1.DND_PROVIDERS],
            styleUrls: ['./app/Views/Employee/Tools/stackplan.component.css']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, administration_service_1.AdministrationService, core_1.ElementRef])
    ], ViewStacktComponent);
    return ViewStacktComponent;
}());
exports.ViewStacktComponent = ViewStacktComponent;
//# sourceMappingURL=viewstack.component.js.map