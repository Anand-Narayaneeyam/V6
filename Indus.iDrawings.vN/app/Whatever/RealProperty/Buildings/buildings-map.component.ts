
import {Component, Output, OnInit, EventEmitter, Input} from '@angular/core';
import {MapComponent} from '../../../Framework/Whatever/Map/map.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IMap } from '../../../framework/models/interface/imap';
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import {BuildingEditComponent} from '../Buildings/buildings-edit.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {ContextMenu} from '../../../Framework/Whatever/contextmenu/contextmenu.component';
import {DrawingsComponent} from '../../asbuilts/drawings/drawings.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
@Component({
    selector: 'buildings-map',
    templateUrl: './app/Views/RealProperty/Buildings/buildings-map.component.html',
    providers: [RealPropertyService, NotificationService],
    directives: [MapComponent, Notification, DropDownListComponent, SplitViewComponent, BuildingEditComponent, DrawingsComponent,
        PageComponent, ContextMenu],
    inputs: [],
    outputs:[]
})
export class BuildingsMapComponent implements OnInit {

    success: any;
    inputItems: IMap[] = [];   
    OwnershipId: number
    buildingMapSource: any;
    totalItems: number;// = 1000;
    OwnershipCategory: IField;
    alignContent: string = "horizontal";
    flag: boolean = false;
    splitview: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    selectedId: number;
    target: boolean = true;
    fieldDetailsBuildingEdit: IField[];
    btnName: string;
    constructor(private administrationService: AdministrationService,private realPropertyservice: RealPropertyService, private notificationService: NotificationService,private generFun: GeneralFunctions) { }
    @Output() submitSuccess = new EventEmitter();
    pageTitle: string="";
    action: string;
    pagePath = 'Real Property / Map';
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    sessionflag: boolean=true
    ngOnInit() {
        debugger
        var contextObj = this;
        contextObj.OwnershipId = 0
        this.realPropertyservice.getMapColumns().subscribe(function (resultData) {    
            
            contextObj.OwnershipCategory = resultData["Data"][0];
            contextObj.OwnershipCategory.FieldValue = "0";
            contextObj.getGisData("0");      
        });
    }

    onChangeDataFieldCategory(event: any) {
        this.flag = false
        if (event>=0)
        this.getGisData(event);
    }

    getGisData(event: any) {
        debugger
        var contextObj = this;
        var Popup: any
        var subPopup: any   
        var color: any
        contextObj.inputItems = [];
         
        var Site: any, Building: any, OwnershipType: any, DateofConstruction: any, BuildingCondition: any;
        this.realPropertyservice.getGISData(event).subscribe(function (resultData) {           
            contextObj.flag = true;               
            contextObj.buildingMapSource = JSON.parse(resultData["FieldBinderData"]);

            for (var i = 0; i < contextObj.buildingMapSource.length; i++) {
                Site = contextObj.buildingMapSource[i]["Name"];
                Building = contextObj.buildingMapSource[i]["Building Name"];
                OwnershipType = contextObj.buildingMapSource[i]["OwnershipType"];
                DateofConstruction = contextObj.buildingMapSource[i]["DateofConstruction"];
                BuildingCondition = contextObj.buildingMapSource[i]["BuildingConditions"];

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

                if (contextObj.buildingMapSource[i]["OwnershipTypeId"] == 3) {
                    color = "Red";
                }
                else {
                    color = "Blue";
                }
                contextObj.inputItems.push({ Id: contextObj.buildingMapSource[i]["Id"], Latitude: contextObj.buildingMapSource[i]["Latitude"], Longitude: contextObj.buildingMapSource[i]["Longitude"], Popup: Popup, Color: color, Draggable: false })
            }
            //contextObj.realPropertyservice.getSessionData().subscribe(function (data) {
            //    var retData = data["Data"];
            //    contextObj.sessionUserId = retData["UserId"];
            //    contextObj.sessionUserCatId = retData["UserCategoryId"];
            //    contextObj.sessionUserRoleId = retData["UserRoleId"];
            //    if (contextObj.sessionUserRoleId != 4) {
            //        contextObj.sessionflag = true
            //    }
            //    else {
            //        contextObj.sessionflag = false
            //    }
            //});
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({ ReportFieldId: 343, Value: "34" })
            fieldobj.push({ ReportFieldId: 340, Value: "94" })
            contextObj.administrationService.getPagePrivilege(fieldobj).subscribe(function (resultData) {
                var privilegeData = JSON.parse(resultData["Data"]["FieldBinderData"])
                var contextmenu = privilegeData.find(function (item) { return item.Id === 94 });
                if (contextmenu.HasRight == true) {
                    contextObj.sessionflag = true
                }
                else {
                    contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (data) {
                        contextObj.sessionflag = data["Data"]
                    });
                    
                }                
            });
        });
    }

    outputItems(ids: any) {
        debugger  
        var contextObj = this;
        contextObj.target = true;
        if (contextObj.sessionflag == true) {
            contextObj.btnName = "Save Changes";
            contextObj.action = "edit";
            contextObj.pageTitle = "Edit Building";
            contextObj.selectedId = ids["Item"].Id;
            if (this.buildingMapSource[this.buildingMapSource.findIndex(c => c.Id == contextObj.selectedId)]["Status"] == "Active") {
                this.realPropertyservice.loadBuildingAddEdit(contextObj.selectedId, "edit").subscribe(function (result) {
                    contextObj.fieldDetailsBuildingEdit = result["Data"];
                    contextObj.fieldDetailsBuildingEdit[3].IsVisible = false;
                    contextObj.fieldDetailsBuildingEdit[6].IsEnabled = false;

                    //console.log("Field object" + contextObj.fieldDetailsBuildingEdit)
                    contextObj.fieldDetailsBuildingEdit.find(function (el) {
                        //console.log("FieldId" + el.FieldId)
                        if (el.FieldId == 54) {
                            el.LookupDetails.PopupComponent = { Name: "Validate on Map", showImage: false };
                            return true
                        }
                    })

                    contextObj.splitview.showSecondaryView = true
                    contextObj.target = false

                });
            }
            else {
                this.notificationService.ShowToaster("Site is not active, Building cannot be edited", 2);
            }
        }
    }

    submitReturn(event) {        
        var contextObj = this;   
        var pageDetails: any
        var UpdatedImap: IMap;
        pageDetails = JSON.parse(event["returnData"]);
        var Popup: any
        var subPopup: any
        var color: any       
        var Site: any, Building: any, OwnershipType: any, DateofConstruction: any, BuildingCondition: any;
        Site = pageDetails[0].Site;
        Building = pageDetails[0].Building;
        OwnershipType = pageDetails[0]['Ownership Type'];
        DateofConstruction = pageDetails[0]['Construction Date'];
        BuildingCondition = pageDetails[0]['Building Condition'];

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

        if (pageDetails[0].OwnershipTypeId == 3) {
            color = "Red"
        }
        else {
            color = "Blue"
        }
        var updatedData = new Array();
        UpdatedImap = { Id: pageDetails[0].BuildingId, Latitude: pageDetails[0].Latitude, Longitude: pageDetails[0].Longitude, Popup: Popup, Color: color, Draggable: false} 
        var index: number = contextObj.inputItems.findIndex(c => c.Id == pageDetails[0].BuildingId);
        contextObj.inputItems[index] = UpdatedImap;
        updatedData = updatedData.concat(contextObj.inputItems);
        contextObj.inputItems = updatedData;
        contextObj.splitview.showSecondaryView = false;
    }
    onContextMenu(event: any, item: any) {
        event.preventDefault();
    }
    //onLeftClick(event: any) {
    //    this.target = true
    //    this.pageTitle = "";
    //    this.splitview.showSecondaryView = true;
    //}    
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
