import {Component, Output, OnInit, EventEmitter, Input} from '@angular/core';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {IMap } from '../../../framework/models/interface/imap';
import {MapComponent} from '../../../Framework/Whatever/Map/map.component';
@Component({
    selector: 'building-Edit',
    templateUrl: './app/Views/RealProperty/Buildings/buildings-edit.component.html',
    providers: [RealPropertyService, NotificationService],
    directives: [MapComponent,FieldComponent, Notification, SplitViewComponent],//PopupAddComponent,, SlideComponent
    inputs: ['selectedId', 'fieldDetailsAdd', 'btnName']

})
export class BuildingEditComponent implements OnInit{ 
    btnName: string;
    success: any;
    dataKey: string = "BuildingId";
    selectedId: number;
    @Output() submitSuccess = new EventEmitter();
    splitview: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    pageTitle: string = "";
    flag: boolean = false;
    inputItems: IMap[] = [];
    buildingMapSource: any;
    fieldDetailsAdd: any;  
    constructor(private realPropertyService: RealPropertyService, private _notificationService: NotificationService) {
    }
    ngOnInit() {
   
    }

    //Edit - Submit functionality
    onSubmitData(event) {      
        console.log(event)
        var contextObj = this;
        if (this.btnName == "Save Changes") {          
            this.realPropertyService.submitBuildingEdit(event["fieldobject"], this.selectedId).subscribe(function (resultData) {              
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Building updated", 3);                   
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data});
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building already exists", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Building Code already exists", 5);
                }
            });          

        }
    }
    popupItemEmit(event) {        
        this.pageTitle = "Map";
        this.getGisData(event);
    }

    getGisData(event: any) {        
        var contextObj = this;
        contextObj.inputItems = [];
        var draggedLatitude: any = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 51 })]["FieldValue"]
        var draggedLongitude: any = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 54 })]["FieldValue"]
        if (draggedLatitude && draggedLongitude) {
            if (draggedLatitude >= -90 && draggedLatitude <= 90 && draggedLongitude >= -180 && draggedLongitude <= 180) {
                var Site: any, Building: any, OwnershipType: any, DateofConstruction: any, BuildingCondition: any;
                var Popup: any, subPopup: any, color: any
                var index: number = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 46 });
                var draggedOwnershipId: number = contextObj.fieldDetailsAdd[index]["FieldValue"];
                if (draggedOwnershipId >= 0) {
                    var OwnershipLookup: any = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = OwnershipLookup.findIndex(c => c.Id == draggedOwnershipId);
                    OwnershipType = OwnershipLookup[index].Value;
                }     
                index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 45 });
                var draggedBuildingConditionId: number = contextObj.fieldDetailsAdd[index]["FieldValue"];
                //BuildingCondition = draggedBuildingConditionId
                if (draggedBuildingConditionId >= 0) {
                    var BuildingConditionLookup: any = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = BuildingConditionLookup.findIndex(c => c.Id == draggedBuildingConditionId);
                    BuildingCondition = BuildingConditionLookup[index].Value;
                }


                index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38 });
                var SiteId: number = contextObj.fieldDetailsAdd[index]["FieldValue"];
                                //BuildingCondition = draggedBuildingConditionId
                if (SiteId >= 0) {
                    var SiteLookup: any = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = SiteLookup.findIndex(c => c.Id == SiteId);
                    Site = SiteLookup[index].Value;
                }

                //Site = this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38 })]["FieldValue"];
                

                var draggedid: any = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38 })]
                Building = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 39 })]["FieldValue"];                
                DateofConstruction = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 47 })]["FieldValue"]
                Popup = "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Site + "\">SITE: " + Site + "</b><br/>"
                    + "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Building + "\">BUILDING: " + Building + "</b>"
                    + "<hr style=\"height: 1px;width:190px;color: #333;background-color:#333;margin-left:0px;margin-top: 5px;margin-bottom: 5px;\" />"
                    + "<table style=\"position:relative;font-size:13px;\"><tr><td style=\"white-space:nowrap;\">Ownership Type</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + OwnershipType + "</td></tr>";
                subPopup = ""
                if (DateofConstruction)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Construction Date</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + DateofConstruction + "</td></tr>"
                if (BuildingCondition)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Building Condition</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + BuildingCondition + "</td></tr>"
                Popup = Popup + subPopup + "</table>";

                if (contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 46 })]["FieldValue"] == 3) {
                    color = "Red"
                }
                else {
                    color = "Blue"
                }
                if (Popup) {
                    contextObj.inputItems.push({ Id: 0, Latitude: draggedLatitude, Longitude: draggedLongitude, Popup: Popup, Color: color, Draggable: true })
                    contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
                    contextObj.flag = true
                    contextObj._notificationService.ShowToaster("Drag Pushpin to update Latitude and Longitude", 2);
                }
            }
        } else {
            contextObj._notificationService.ShowToaster("Enter Latitude and Longitude Values", 5);
        }
    }
    outputDraggedValue(event: any) {        
        var contextObj = this
        var DraggedItem: IMap = event.DraggedItem
        this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 51 })]["FieldValue"] = DraggedItem.Latitude
        this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 54 })]["FieldValue"] = DraggedItem.Longitude
    }
}