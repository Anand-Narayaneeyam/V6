
import {Component, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {HTTP_PROVIDERS } from '@angular/http';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../FrameWork/ExternalLibraries/dnd/ng2-dnd';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {EmployeeService} from '../../../Models/Employee/employee.services';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {OrgWiseEmpGridComponent} from './orgwiseemployee-grid.component';

@Component({
    selector: 'view-stack',
    templateUrl: './app/Views/Employee/Tools/viewstack.component.html',
    directives: [Notification, DND_DIRECTIVES, SplitViewComponent, OrgWiseEmpGridComponent, FieldComponent],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService, AdministrationService,DND_PROVIDERS],
    styleUrls: ['./app/Views/Employee/Tools/stackplan.component.css']

  
  

   
})
export class ViewStacktComponent  {

    @Input() prjtId: number;
    @Input() stackPlanDetailsId: number;
    @Input() spacePlaningPrjtStatusId: number;
    @Output() retSaveStack = new EventEmitter();
    public itemSource: any;
    public FloorwiseOrgData: any;
    public OrgwiseGroup: any;
    public orgwiseEmpColumns: any[];
    public orgwisEmpSource: any[];
    isContextMenu: boolean = false;
    OrgNamefornew: string = "";  
    imageName:string = "";
    tileclassname: string = "";
    moved: boolean = false; 
    orgWiseEmpSrc: any[];  
    sectarget: number = 0;
    fieldDtlsSave: IField[];
    //btnName: string = "";
    lstOrgUnits = [];
    level:number = 0;
    MaxSeatingCapacity: number = 0;
    calcwidthFun: boolean = true;
    blndropEnable: boolean = true;
    btnSave: string = "Save";
    pageTitle: string = "";
    isSubmit=false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    constructor(private empService: EmployeeService, private notificationService: NotificationService, private adminService: AdministrationService, private elRef: ElementRef) {
      

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["stackPlanDetailsId"]) {
            this.loadStackSrc();
        }
    }

    

    loadStackSrc() {
        var contextObj = this;
        if (contextObj.stackPlanDetailsId == undefined) {
            contextObj.stackPlanDetailsId = 0;
        }
        if (contextObj.stackPlanDetailsId == 0) {
            contextObj.btnSave = "Save"
        } else {
            contextObj.btnSave = "Save Changes"
        }
        this.empService.GetEmployeeSpacePlanningStackOccupancyDetails(contextObj.prjtId, contextObj.stackPlanDetailsId).subscribe(function (result) {
            contextObj.FloorwiseOrgData = JSON.parse(result.Table1);

            contextObj.OrgwiseGroup = JSON.parse(result.Table2);
            contextObj.OrgNamefornew = JSON.parse(result.Table3)[0].L1Caption;
            contextObj.getMaxSeatCapacity(1, contextObj.FloorwiseOrgData);          
            for (var i = 0; i < contextObj.FloorwiseOrgData.length; i++) {
                contextObj.FloorwiseOrgData[i]['OrgUnit'] = contextObj.filterOrgwiseGroup(contextObj.FloorwiseOrgData[i]['FloorId'])
            }
        });

        //this.adminService.getOrganizationalStructureFields(34).subscribe(function (resultData) {
           
        //});
        this.empService.getOrganizationalStructureFields().subscribe(function (resultData) {
            if (resultData != "") {
                contextObj.GetOrgUnitNames(JSON.parse(resultData));
            }
        });

    }

    private GetOrgUnitNames(objData) {
        var obj = Object.values(objData[0]);       
        for (let i = 1; i < obj.length; i++) {
                this.lstOrgUnits.push(obj[i]);
                this.level++;            
        }          
    }

    calculateWidth(orgDetails, floordata,target) {
        var minwidth = 25;    
        var newSeatingCapacity = 0; 
        var context = this;
        //var tdwidth = this.elRef.nativeElement.getBoundingClientRect().width; 
        var tdwidth = this.elRef.nativeElement.getBoundingClientRect().width;//$(".stacklist").width();       
        var MaxSeatingCapacity = this.MaxSeatingCapacity;  //this.getMaxSeatCapacity(1, floorData);
  
        var Unitwidth =tdwidth / MaxSeatingCapacity;
        var MinSeats = minwidth / Unitwidth;       
        var K = [];        
    
        for (var pNode = 0; pNode < this.FloorwiseOrgData.length; pNode++) {
            var filterdOrgDetails = this.FloorwiseOrgData[pNode]['OrgUnit']; //this.filterOrgwiseGroup(this.FloorwiseOrgData[pNode].FloorId);
            var minwidthcount = 0, TotalminSeatcount = 0;
            for (var divNode = 0; divNode < filterdOrgDetails.length; divNode++) {
                var seats=0;
                if (Object.getOwnPropertyNames(filterdOrgDetails[divNode]).length == 0) { 
                    seats = this.FloorwiseOrgData[pNode]['FreeSeat'] > "0" ? parseInt(this.FloorwiseOrgData[pNode]['FreeSeat']) : 0;                              
                } else {
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
         var orgseat=0;
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
         
        }
    

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

    getMaxSeatCapacity(target, flrData) {
        var tempmaxs = 0, maxcap = 0;
        if (target == 1) {
            for (let i = 0; i < flrData.length; i++) {
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
            }else {           
                maxcap = flrData["Seating Capacity"];
            }
        }
        return maxcap;
    }

   
 
   
    filterOrgwiseGroup(floorId) {         
        var filteredData= this.OrgwiseGroup.filter(function (el) {
           return el.FloorId == floorId;
        });
        filteredData.push({});              
       return filteredData;
    }

    freeSeatsStyleClass(FlrFreeSeat) {
        let clsName = "";  
        if (FlrFreeSeat > 0) {
            clsName = "Vaccancy";
        }
        else if (FlrFreeSeat < 0) {
            clsName = "OverOccup";                    
        }
        else {
            clsName = "NominalOccup";
        }
        return clsName;;
    }

    freeSeatsStyleArrowClass(FlrFreeSeat): string {
        let arrowClass = "";
        if (FlrFreeSeat < 0) {
            arrowClass = "OverOccup-arrow-up";
        }
        return arrowClass;
    }

    getSeatingCapacity(FlrFreeSeat): string {
        let textforcapacity = "";
        if (FlrFreeSeat < 0) {
            textforcapacity = "Over: " + Math.abs(FlrFreeSeat);
        }
        return textforcapacity;
    }

    setColor(colorId): string {
       
       
        return "#" + colorId;
    }
    geVaccantclass(freeseats) {
        if (freeseats > 0)
            return "tileVaccant";
        else
            return "zeroVaccant";
    }
    gettileclass(statusId, blnHasSplit, target, orgUnitSeats) {
        let imageName = "";
        let tileclassname = "";
        if (orgUnitSeats == 0) {
            return  "zeroOrgUnit";
        } else {
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
            } else
                return imageName;
        }
    }

    
   
    setDeptName(orgdetails) {
      
            let deptName = "";
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
        
        
    }
    rightclickdiv(events) {
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
}
   contextmenus(split, remove, freeze, restore, defreeze,event) {
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
    document.getElementById("rmenu").style.left = (event.clientX-13) + 'px';
   
}

 
   
   onDragOver(event, orgDetails) {    
        var context = this;      
        var empIds = "";      
      
        var srcFloorId = orgDetails["SourceFloorId"];      
        /*context.empService.GetEmployeesNotHavingSeatsPerGradeAndSpaceType(orgDetails['OrgUnitId'], orgDetails['TargetFloor'], srcFloorId, empIds).subscribe(function (result) {
            if (result["Data"]["FieldBinderData"] != "[]") {
                context.sectarget = 1;
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            }             
        });*/  
    }
  
    strdoubleclick(event, orgDetails) { 
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
    }


     saveclick() {
        var context = this;      
        // this.btnName = "Save";
        this.pageTitle = "";
        var target = 0;
        if (context.stackPlanDetailsId == 0) {
            this.pageTitle = "New Stack Plan";
            target = 1;
        }
        else {
            this.pageTitle = "Edit Stack Plan"
            target = 2
        }
        this.empService.loadAddEditStack(context.stackPlanDetailsId, this.prjtId, target).subscribe(function (result) {
        
            context.fieldDtlsSave = result["Data"];
            context.sectarget = 2;
            
            context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;     
        });
    }

     private onSubmitData(event) {
         var anticipatedseats = ""; //todo
         var arrJson = { "Data":this.FloorwiseOrgData }
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
                         } else {
                             context.notificationService.ShowToaster("Stack Plan details added", 3);
                             action = "add"
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

     }

     dropSuccess(dragData, drpFloorDta) {      
           
        

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
     }

     UpdateJsonData(draggedData, drpFloorDetls) {
         var srcFloorName = draggedData.SourceFloorName;
         var srcSiteName = draggedData.SourceSiteName;
         var srcBuildingName = draggedData.SourceBuildingName;
         var floorallocatedseats =0;
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
         if(success){
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
                         draggedData.SourceFloorId = drpFloorDetls["FloorId"]
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
                     // context.setStackInfo(item["FreeSeat"], context);
                 }
             }
             //if (count == 0) {
             //    return true;
             //}
             //else {
             //    return false;
             //}

             //});
         }
          
     }
    /**
     block moving through the vaccant block not visible in UI
     */
     ondragEnd(flrData, index, sortdata) {
         var emptyObjIndex = -1;
         var withoutemptyObj = flrData['OrgUnit'].filter(function (item, i) {
             if (Object.keys(item).length === 0) {
                 emptyObjIndex = i;
             }
             return Object.keys(item).length != 0;
         });
         withoutemptyObj.push(flrData['OrgUnit'][emptyObjIndex]);
         flrData['OrgUnit'] = withoutemptyObj;
     }



     setStackInfo(freeSeats,context) {
         //var clsname = context.freeSeatsStyleClass(freeSeats);
         //var vacc = context.getSeatingCapacity(freeSeats);
         //var arrowType = context.freeSeatsStyleArrowClass(freeSeats);
        // if (freeSeats<0) remove the vaccant block in the floor ---- not done

     }



     dragEna(event) {
        
     }
     dropen(event) {
        
     }
     dragOver(dragData, drpZoneflrId) {
        
     }
  
    onDrop(event, data: any) {
      
        return false;
    }
  

    NewOrgclick(event) {
        
    }





   // (drop) = "onDrop($event, $event)"
   // (drop) = "onDrop($event, $event)"(dragover) = "allowDrop($event)"
      //  (dragstart) = "onDragStart($event, '')"
}