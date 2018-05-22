import {Component, Output, EventEmitter, Input, OnInit, SimpleChange, OnChanges} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SpaceService } from '../../../Models/space/space.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';



@Component({
    selector: 'connect-components',
    templateUrl: './app/Views/Common/OpenDrawing/Connect_Components.html',
    directives: [GridComponent,FieldComponent, Notification, SubMenu, ConfirmationComponent, SlideComponent, SplitViewComponent, DropDownListComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, ValidateService,GeneralFunctions, ObjectsService],
    inputs: ['selectedId', 'action', 'fieldDetails', 'btnName', 'pageTarget', 'drawingId', 'isBuildingDrawing'],

})

export class ConnectComponents implements OnInit, OnChanges {
    @Input() fieldDetailsAdd: IField[];
    fieldObjectlist: IField[];
    @Input() drawingId: number;
    @Input() isBuildingDrawing: boolean;
    @Input() primaryObjectId: boolean; 
    @Input() RemoveConnectionResult: number;
    opendrawingService: any;
    pageTarget: number;
    fieldObject: IField[];
    fieldDetailsAdd1: IField[] = [];
    inputItems: IGrid = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    btnName: string;
    enableMenu: number[];
    @Input() action: string;
    @Input() fieldDetails: any;
    @Output() submitSuccess = new EventEmitter();
    @Output() dropChange = new EventEmitter();
    pageTitle: string;
    totalItems: number = 0;
    showSlide = false;
    position = "top-right";
    message = "";
    AssociationId: any;
    classId: any;
    objectCategoryId: any;
    fieldDetailsConnectivity: any;
    GridObjectId: any;
   // ShowRemoveConnection = false;
    saveBtnName: string;
   // btnName: string;
    gridLength: any;
    refreshgrid;
    gridDataKey;
    isbtnDisable: any;
    ShowRemoveConnection: boolean = false;
   // showButton: boolean = false;



    constructor(private notificationService: NotificationService, private _validateService: ValidateService, private generalFunctions: GeneralFunctions, private ObjectsService: ObjectsService, private generFun: GeneralFunctions) {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.RemoveConnectionResult == 1) {
            this.onDropDownChange(event);
        }
    }
   

    ngOnInit() {
        var contextObj = this;
        contextObj.btnName = contextObj.fieldDetails[3] == 0 ? "Remove Connection" : "Save";
        var drawingclass = JSON.parse(contextObj.fieldDetails[0])[0].Class;
        var Objnumber = JSON.parse(contextObj.fieldDetails[0])[0].ObjectNumber;
        var classId = contextObj.fieldDetails[1];
        var objectCategoryId = contextObj.fieldDetails[2];


        contextObj.ObjectsService.getComponentConectivity(classId).subscribe(function (result) {
            
            //contextObj.fieldDetailsAdd = result["Data"];
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 4481) {
                    item.FieldValue = drawingclass;
                    item.IsEnabled = false;
                }
                else if (item.ReportFieldId == 500108) {
                    item.FieldValue = Objnumber;
                    item.IsEnabled = false;
                }
            });
            contextObj.fieldDetailsAdd = result["Data"];
            //contextObj.fieldDetailsAdd = contextObj.fieldDetailsAdd;



        });

    }

    onDropDownChange(event: any) {
        var contextObj = this;
        var objectCategoryId = contextObj.fieldDetails[2];
        //if (event.ReportFieldId == 4455)
        this.AssociationId = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455 }).FieldValue; //event.LookupDetails.LookupValues[0].Id;
        
        if (event.FieldId == 2664 && contextObj.fieldDetails[3] == 0) {

            contextObj.ObjectsService.GetAssociationTypeForConnectivity(contextObj.primaryObjectId).subscribe(function (result) {
                var PrimaryComponentNoId = JSON.parse(result.FieldBinderData)[0].Id;

                var secondaryClassId = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482 }).FieldValue;
                contextObj.ObjectsService.RemoveConnectivity(objectCategoryId, contextObj.drawingId, contextObj.isBuildingDrawing, secondaryClassId, contextObj.AssociationId, 0, PrimaryComponentNoId).subscribe(function (result) {
                    contextObj.fieldDetailsConnectivity = JSON.parse(result['FieldBinderData']);
                        contextObj.gridDataload(objectCategoryId);
                });
            });
        }
        else {
          
            var classId = contextObj.fieldDetails[1];
            var reportfieldIdArray: ReportFieldIdValues[] = [];
            reportfieldIdArray.push({
                ReportFieldId: 649,
                Value: objectCategoryId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 647,
                Value: classId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 4483,
                Value: contextObj.AssociationId,
            });

            var Clearddl = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455 }).FieldValue;
            if (Clearddl == "-1") {
                var secondComp = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482 });
                secondComp.LookupDetails.LookupValues = [];

                contextObj.fieldDetailsConnectivity = undefined;
                secondComp.FieldValue = "-1";

             
                var fieldObject =  contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4482 });
                    var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
                    if (el != null && el != undefined) {
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
                        }, 100);
                    }
                
               
            }

        
            else {
                var relationshiddl = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId == 4455 })
                var DropdownList = <HTMLSelectElement>document.getElementById(relationshiddl.FieldId.toString());
                if (DropdownList != null) {
                    var tempselectedtext = DropdownList.options[DropdownList.selectedIndex].innerHTML;
                    var ddlvalue = [];
                    ddlvalue = relationshiddl.LookupDetails.LookupValues;
                    var Isinverse = ddlvalue.find(function (item) { return item.Value == tempselectedtext });
                    reportfieldIdArray.push({
                        ReportFieldId: 1089,
                        Value: Isinverse.IsChecked,
                    });
                }
                contextObj.ObjectsService.GetAssociationTypeConnectivity(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
                    contextObj.ObjectsService.getComponentConectivity(JSON.parse(result.FieldBinderData)[0].Id).subscribe(function (result1) {
                    });

                    var ComponentType = [];
                    // ComponentType.push(JSON.parse(result.FieldBinderData)[0].Value);
                    ComponentType = JSON.parse(result.FieldBinderData);
                   
                   
                    contextObj.fieldDetailsAdd.find(function (item) {
                        if (item.ReportFieldId == 4482) {
                            item.LookupDetails.LookupValues = ComponentType;
                            return true;
                        }
                        return false;
                    });
                });
            }
        }
    }
    gridDataload(event) {
        var contextObj = this;
        contextObj.ObjectsService.getRemoveConnectivity().subscribe(function (result) {    /*Calling Grid*/
            contextObj.fieldObjectlist = result["Data"];
            if (event == 20) {
                var checkFieldLabel = contextObj.fieldObjectlist.find(function (item) { return item.FieldId == 2785 });
                checkFieldLabel.FieldLabel = 'Equipment No.';
            }
            else if (event == 3) {
                var checkFieldLabel = contextObj.fieldObjectlist.find(function (item) { return item.FieldId == 2785 });
                checkFieldLabel.FieldLabel = 'Object No.';
            }

            if (contextObj.fieldDetailsConnectivity.length == 0) {
                //  contextObj.showButton = false;
                contextObj.isbtnDisable = true;
                contextObj.btnName = contextObj.fieldDetails[3] == 0 ? "Remove Connection" : "Save";

                contextObj.notificationService.ShowToaster("No data exists", 2);
                return;
            } else
                // contextObj.showButton = true;
                contextObj.isbtnDisable = false;
            contextObj.GridObjectId = contextObj.inputItems.selectedIds[0];
            contextObj.gridLength = contextObj.fieldDetailsConnectivity.length;

        });
    }
    onSubmitData(event) {
        if (this.fieldDetails[3] == 1) {
           
            this.submitSuccess.emit({
                "details": this.fieldDetailsAdd,
                "associationId": this.AssociationId,
                "connectivityStatus": this.fieldDetails[3],
                "GridObjectId": this.GridObjectId,
                "gridLength": this.gridLength,
                "grid": this.fieldDetailsConnectivity,
                "NewprimaryObjectId": this.primaryObjectId
                //"gridDataKey": this.inputItems.dataKey
            });
        } else {
            if(this.fieldDetailsConnectivity.length > 0)
            this.ShowRemoveConnection = true;
        }
    }

    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    RemoveConnectionfromConnection() {

        var contextObj = this;
        contextObj.ObjectsService.RemoveConnectivityFromGrid(0, contextObj.primaryObjectId, contextObj.inputItems.selectedIds[0], contextObj.AssociationId, 0, 0, 0, 0, 0).subscribe(function (result) {
            if (result.StatusId == 1) {
                
                var index = contextObj.fieldDetailsConnectivity.findIndex(function (item) { return item.ObjectId == contextObj.inputItems.selectedIds[0] });
                contextObj.fieldDetailsConnectivity.splice(index, 1);
                var s = JSON.stringify(contextObj.fieldDetailsConnectivity);
                contextObj.fieldDetailsConnectivity = [];
                setTimeout(function () {
                    contextObj.fieldDetailsConnectivity = JSON.parse(s);        
                }, 100);
                          
                contextObj.notificationService.ShowToaster("Connection Removed", 3);
            }
        });
    }


    okClick(event: Event) {
        this.ShowRemoveConnection = !this.ShowRemoveConnection;
       
    }

    cancelClick(event: Event) {
        this.ShowRemoveConnection = !this.ShowRemoveConnection;
    }

    closeSlideDialog(value: any) {
        this.ShowRemoveConnection = value.value;
    }
    okRemoveConnectivityClick(event: Event) {
        this.ShowRemoveConnection = false;
        this.RemoveConnectionfromConnection();
        if ((this.fieldDetailsConnectivity.length - 1) <= 0)
            this.submitSuccess.emit({
                "connectivityStatus": this.fieldDetails[3],
                 "NewprimaryObjectId": this.primaryObjectId
            });
       

        
    }
    cancelRemoveConnectivityClick(event: Event) {
        this.ShowRemoveConnection = false;
    }
        
 }

interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}


