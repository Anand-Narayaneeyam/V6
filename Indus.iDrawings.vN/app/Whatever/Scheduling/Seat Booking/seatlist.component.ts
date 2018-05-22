
import {Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { SeatResources } from './seatresourcelist.component';
@Component({
    selector: 'seats-List',
    templateUrl: './app/Views/Scheduling/Seat Booking/seatlist.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, FieldComponent,SeatResources],
    providers: [HTTP_PROVIDERS, NotificationService, SchedulingService, ValidateService],
    inputs: ['SelectedSpaceId', 'RoomSeatCapacity','multiplespacerommnumber']

})

export class SeatsGridComponent {
    SelectedSpaceId;
    RoomSeatCapacity;
    pageTitle: string = "";
    target: number = 0;
    fieldObject: IField[];
    itemSource: any[];
    inputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: true, sortDir: "ASC", sortCol: "Id" };
    fieldDetailsAdd: IField[];
    @Output() seatSuccess = new EventEmitter();
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    @Input() RoomNumber: string ="";
    @Input() category: string = "";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    updateObj = [];
    seatspacearray = [];
    refreshgrid;
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
            "title": "Resources",
            "image": "Resources",
            "path": "Resources",
            "submenu": null
        }, 
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
        {
            "id": 4,
            "title": "Update",
            "image": "Update",
            "path": "Update",
            "submenu": null
        }


    ];

    enableMenu = [];
    position = "top-right";
    showSlide = false;
    multiplespacerommnumber: any = [];
    slideMSg = "";  
    slidewidth = 250;   
    constructor(private schedulingService: SchedulingService, private validateService: ValidateService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }
    ngOnInit() {

        //this.pagePath = "Employee / Scenarios ";
        var contextObj = this;

        this.schedulingService.getSeatListColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                item.Width = "0.5*";
            })
           
            resultData["Data"].find(function (el:IField) {
                if ((contextObj.category == "5" || contextObj.category == "6") && el.FieldId == 1966) {
                    el.IsVisible = false;
                    contextObj.menuData.splice(3,1)
                    contextObj.menuData.splice(0, 1)
                }
            });
          
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);

    }
    public dataLoad(target?: number, context?: any) {
        var reportFieldIdArray: ReportFieldArray[] = [];
        for (var i = 0; i < context.SelectedSpaceId.length; i++) {
            reportFieldIdArray.push({ ReportFieldId: 8795, Value: context.SelectedSpaceId[i].toString() })
        }
        context.schedulingService.seatsListData(JSON.stringify(reportFieldIdArray), context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
    
            context.totalItems = resultData["Data"].DataCount;

            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Seats exist", 2);
                context.enableMenu = [1];
            }
        });
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
    public onSubMenuChange(event: any) {
        var contextObj = this;
        this.pageTitle = "";
        this.slideMSg = "";      
        this.target = 0;
        switch (event.value) {
            case 1:
              
                this.pageTitle = "New Seat";
                this.target = 1;
                this.addSeat();
                break;
            case 2:
                this.pageTitle = "Resources";
                this.target = 2;
                this.loadSchedulingResource();
                break;
            case 3:
                this.target = 3;
                this.deleteClick();
                break;
            case 4:
                this.updateSeatNumberAsHoteling();
                break;
        }

    }
    private addSeat() {
        var context = this;  
        var maxValue = 0;
        var tempcount = 0;
        if (this.itemSource) {
            for (var i = 0; i < this.SelectedSpaceId.length; i++) {
                for (var j = 0; j < this.itemSource.length; j++) {
                    if (this.itemSource[j]["SpaceId"] == this.SelectedSpaceId[i])
                        tempcount++;
                }
                if (maxValue < tempcount) {
                    maxValue = tempcount;
                    tempcount = 0;
                }
            }
        }
        if (this.itemSource && maxValue == context.RoomSeatCapacity) {
            if (this.SelectedSpaceId.length == 1)
                context.notificationService.ShowToaster("Number of Seats should be less than or equal to Room Seating Capacity", 2);
            else
                context.notificationService.ShowToaster("Some of the selected spaces have more or same Number of Seats compared to  Room Seating Capacity", 2);
        }
         else {
            var count = 4;/*for finding numberObj and rdbtn obj*/
            this.schedulingService.getAddSeatFields().subscribe(function (resultData) {
               
                resultData["Data"].find(function (el:IField) {
                    if (el.FieldId == 2032) {
                        el.FieldValue = "48";
                        count--;
                    }
                    if (el.FieldId == 2028) {
                        el.IsMandatory = true;
                        count--;
                    }
                    if (el.FieldId == 2099) {
                        el.FieldValue = "53";

                        count--;
                    }
                    if (el.FieldId == 2027) {
                        if (context.multiplespacerommnumber.length == 0) {
                            el.FieldValue = context.RoomNumber.toString();
                            el.IsVisible = true;
                        }
                        else {
                            el.FieldValue = "";
                            el.IsVisible = false;
                            el.IsMandatory = false;
                            el.HasValidationError = false;
                        }
                        el.IsEnabled = false;
                        count--;
                    }
              
                    if (count == 0)
                        return true;
                    else return false;

                });
                context.fieldDetailsAdd = resultData["Data"];
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
            });
        }
    }
    private loadSchedulingResource() {
        if (this.inputItems.selectedIds.length > 1) {
            var context = this;
            var isResourceObj = this.inputItems.rowData.filter(function (el) {
                return el["Resources"] == "true";
            });
            if (isResourceObj.length > 0) {
                context.slideMSg = "Resources already added will be deleted.Do you want to continue?"; 
                context.showSlide = !context.showSlide;
            }
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    private onSubmitData(event) {          
        var addObj = JSON.parse(event["fieldobject"]);
        var count = 3;
        var rdbtnVal="";
        var fromNum = 0;
        var toNum = 0;
        addObj.find(function (el) {
            switch (el.ReportFieldId) {
                case 7390:
                    rdbtnVal = el.Value;
                    count--;
                    break;
                case 6714:
                    fromNum = el.Value;
                    count--;
                    break;
                case 6715:
                    toNum = el.Value;
                    count--;
                    break;
            }
            
            if (count == 0)
                return true;
            else
                return false;

        })
        var ismultiple = rdbtnVal == "48" ? false : true;
        var context = this;        
        if (ismultiple && +(fromNum) > +(toNum)) {
            context.notificationService.ShowToaster("To Number should be greater than or equal to From Number", 2);
        } else if (ismultiple && ((context.itemSource && (context.itemSource.length + (toNum - fromNum))) >= context.RoomSeatCapacity || (toNum - fromNum) >= context.RoomSeatCapacity )) {
            context.notificationService.ShowToaster("Number of Seats should be less than or equal to Room Seating Capacity", 2);
        }else {
            addObj.push({ "ReportFieldId": 8791, "Value": context.category });
            for (var i = 0; i < context.SelectedSpaceId.length; i++) {
                addObj.push({ "ReportFieldId": 780, "Value": context.SelectedSpaceId[i] })
            }
            this.schedulingService.addSeat(JSON.stringify(addObj), ismultiple, context.multiplespacerommnumber).subscribe(function (resultData) {
                switch (resultData.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        var msg = "";
                        if (ismultiple) {
                            msg = "Seats added";
                        } else {
                            msg = "Seat added";
                        }
                        context.notificationService.ShowToaster(msg, 3);
                        context.dataLoad(0, context);
                        context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.seatSuccess.emit({ action: "AddSeat", type: context.category });

                        break;
                    case 3:
                        if (resultData.ServerId == -1)
                            var msg = "";
                      
                        if (ismultiple) {
                            msg = "Seat Number(s) " + resultData["Data"] +" already exists";
                        } else {
                            msg = "Seat Number already exists";
                        }
                            context.notificationService.ShowToaster(msg, 5);
                        break;
                }
            });
        }
          
    }
    private deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {         
            this.slideMSg="Are you sure you want to delete the selected seat?"; 
            this.showSlide = !this.showSlide;
        }
    }
    private okSlideClick(event: Event) {
        if (this.target == 3) {
            this.deleteSeat();
        } else {
            this.loadSchedulingResource();
        }
        this.showSlide = !this.showSlide;
    }

    private cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    private closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    private deleteSeat() {
       
        var contextObj = this;
        contextObj.schedulingService.deleteSeat(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {        
            switch (resultData.StatusId) {              
                case 0:
                    if (resultData.ServerId == 1) {
                        contextObj.notificationService.ShowToaster("Seat in use, cannot be deleted", 5);
                    }
                    break;
                case 1:
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.notificationService.ShowToaster("Seat deleted", 3);
                    var hotlingSeatCount = 0;
                    hotlingSeatCount = contextObj.hotelingSeatUpdate(0);
                    contextObj.seatSuccess.emit({ action: "DeleteSeat", hotellingSeatCount: hotlingSeatCount, type: contextObj.category});
                    break;                               
            }
        });   
    }
    private hotelingSeatUpdate(target) {
      
        var hotlingSeatCount = 0;
        this.updateObj = [];
        this.seatspacearray = [];
        for (var i = 0; i < this.itemSource.length; i++) {
            var singleObj = {
                "SeatId": this.itemSource[i]["Id"],
                "IsHotelling": this.itemSource[i]["Hoteling Seat?"],
                "IsApproval": false
            }
            this.seatspacearray.push({ SeatId: this.itemSource[i]["Id"], SpaceId: this.itemSource[i]["SpaceId"], IsHotelling: this.itemSource[i]["Hoteling Seat?"] })
            this.updateObj.push(singleObj);
            if (this.itemSource[i]["Hoteling Seat?"] == true) {              
                    hotlingSeatCount++;
                
            }
        }
        return hotlingSeatCount;
    }
    private updateSeatNumberAsHoteling() {
      
        var context = this;
        var hotlingSeatCount = 0;
        hotlingSeatCount= context.hotelingSeatUpdate(1);
        //for (var i = 0; i < this.itemSource.length; i++) {
        //    var singleObj = {
        //        "SeatId": this.itemSource[i]["Id"],
        //        "IsHotelling": this.itemSource[i]["Hoteling Seat?"],
        //        "IsApproval": false
        //    }
        //    updateObj.push(singleObj);
        //}
        //    if (this.itemSource[i]["Hoteling Seat?"] == true) {
        //        hotlingSeatCount++;
        //    }
        //}
        this.schedulingService.updateSeatNumberAsHoteling(JSON.stringify(context.updateObj)).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:                
                    context.notificationService.ShowToaster("Seat(s) updated", 3);
                    context.seatSuccess.emit({ action: "UpdateSeat", hotellingSeatCount: hotlingSeatCount, type: context.category, seatspacearray: context.seatspacearray  });
                    break;
            }
        });
    }
    private rdBtnChange(event) {
        var context = this;

        var blnShow = false;
        var fldObj = event.rbtnObject.fieldobject;
        var fldaddObj = this.fieldDetailsAdd;
        if (fldObj.FieldId == 2032) {

            for (var i = 0; i < fldaddObj.length; i++) {

                if (fldaddObj[i].FieldId == 2028) {
                    if (fldObj.FieldValue == "48") {
                        fldaddObj[i].IsVisible = true;
                        fldaddObj[i].IsMandatory = true;
                    } else {
                        fldaddObj[i].IsVisible = false;
                        fldaddObj[i].IsMandatory = false;
                        fldaddObj[i].HasValidationError = false;
                    }
                }
                if (fldaddObj[i].FieldId == 2029 || fldaddObj[i].FieldId == 2030) {
                    if (fldObj.FieldValue == "49") {
                        fldaddObj[i].IsVisible = true;
                        fldaddObj[i].IsMandatory = true;

                        if (<HTMLElement>document.getElementById(fldaddObj[i].FieldId.toString())) {
                            var el = <HTMLElement>document.getElementById(fldaddObj[i].FieldId.toString());
                            context.validateService.initiateValidation(fldaddObj[i], context, true, el);
                        }
                    } else {
                        fldaddObj[i].IsVisible = false;
                        fldaddObj[i].IsMandatory = false;
                        fldaddObj[i].HasValidationError = false;
                    }
                }
            }
        }

        else if (fldObj.FieldId == 2099) {
            var Item = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2027 })//prefix
            Item.FieldValue = "";
            Item.IsEnabled = true;
            Item.IsMandatory = true;
            Item.HasValidationError = true;
            if (context.SelectedSpaceId.length > 1)
            {
                for (var i = 0; i < fldaddObj.length; i++) {
                    if (fldObj.FieldValue == "50" || fldObj.FieldValue == "51" || fldObj.FieldValue == "52") {
                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }

                    } else if (fldObj.FieldValue == "53") {
                        var count = 0;
                        var prefix = "";
                        if (Item != undefined) {
                            Item.FieldValue = context.RoomNumber.toString();
                            fldaddObj[i].HasValidationError = false;
                            Item.IsEnabled = false;
                        }

                    }
                }
                Item.FieldValue = "";
                Item.IsEnabled = false;
                Item.IsMandatory = false;
                fldObj.HasValidationError = false;
            }
            else {
                for (var i = 0; i < fldaddObj.length; i++) {
                    if (fldObj.FieldValue == "51") {
                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }

                    } else if (fldObj.FieldValue == "52") {//with room number

                        if (Item != undefined) {
                            Item.FieldValue = "";
                            Item.IsEnabled = false;
                            Item.IsMandatory = false;
                            fldaddObj[i].HasValidationError = false;
                        }

                    } else if (fldObj.FieldValue == "53") {
                        var count = 0;
                        var prefix = "";
                        if (Item != undefined) {
                            Item.FieldValue = context.RoomNumber.toString();
                            fldaddObj[i].HasValidationError = false;
                            Item.IsEnabled = false;
                        }

                    }
                }                
            }
        }
    }
    private seatResourceAdd(event) {
        var context = this;
        var selCount = this.inputItems.selectedIds.length;
        this.refreshgrid = [];
        this.itemSource.find(function (el) {
            if (context.inputItems.selectedIds.indexOf(el["Id"]) > -1) {
                if (event.existingResrc.length > 0) {
                    el["Resources"] = "Yes";
                    el["Resource"] = "Yes";
                } else {
                    el["Resources"] = "No";
                    el["Resource"] = "No";
                }
                selCount--;
            }
            if (selCount == 0) {
                context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                context.refreshgrid = context.refreshgrid.concat([true])
                return true;
            }
            else return false;

        });
    }
    onSecondaryClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }
    
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}