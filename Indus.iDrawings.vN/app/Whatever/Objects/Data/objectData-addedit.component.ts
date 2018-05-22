import { Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter, Input,AfterViewInit } from '@angular/core';
import {ObjectsService} from '../../../Models/Objects/objects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'objectData-addedit',
    templateUrl: 'app/Views/Objects/Data/objectData-addedit.component.html',
    providers: [ObjectsService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'ObjectCategoryId', 'objectCategoryName', 'dataOption', 'drawingIds', 'selectedIddetails', 'target', 'IsBarcodeSubscribed', 'SiteId','moduleId'],
})

export class ObjectDataAddEditComponent implements OnInit{
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    ObjectCategoryId: any;
    objectCategoryName: string;
    objectname: any;
    objectclassname: any;
    objectmultiplename: any;
    dataOption: any;
    drawingIds: any;
    featureId: number;
    Issubscribed:boolean = false;
    selectedIddetails: any[];
    tempdata: any[];
    tempdataforlist: any[];
    @Input() attributeoption: number;
    @Input() blockRefHandle: string;
    @Input() selectedSpaceId: string;
    @Input() xPosition: string;
    @Input() yPosition: string;
    @Input() objectAngle: string;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Input() moduleId: number;
    @Output() submitSuccess = new EventEmitter();
    target: any;
    IsBarcodeSubscribed: boolean = false;
    prevBarcode: any;
    IsAutoNumbering: boolean = false;
    IsClassPrefix: boolean = false;
    isSiteAdmin: boolean = false;
    SiteId: string;
    constructor(private objectService: ObjectsService, private notificationService: NotificationService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.fieldDetailsAdd.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 4303:   /*Barcode*/
                    contextObj.prevBarcode = item.FieldValue;
                    break;
                case 7411:   /*Barcode*/
                    if (contextObj.SiteId != undefined && contextObj.SiteId!=null) {
                        item.FieldValue = contextObj.SiteId;
                        item.IsEnabled = false;
                    }
            }
            return item.ReportFieldId === 4303;
        });
        if (this.blockRefHandle == undefined || this.blockRefHandle == null)
            this.blockRefHandle = '';
        if (this.selectedSpaceId == undefined || this.selectedSpaceId == null || this.selectedSpaceId=="0")
            this.selectedSpaceId = '';
        if (this.xPosition == undefined || this.xPosition == null)
            this.selectedSpaceId = '';
        if (this.yPosition == undefined || this.yPosition == null)
            this.selectedSpaceId = '';
        if (this.objectAngle == undefined || this.objectAngle == null)
            this.selectedSpaceId = '';
        if (this.drawingIds == undefined || this.drawingIds == null)
            this.drawingIds = '';
        var featureid = "105";
        switch (contextObj.ObjectCategoryId) {
            case 1:
                featureid = "105,72,62";
                this.objectname = "Asset";
                this.objectmultiplename = "Assets"
                this.objectclassname = "Asset Class"
                break;
            case 2:
                featureid = "107,73,68";
                this.objectname = "Furniture";
                this.objectmultiplename = "Furniture"
                this.objectclassname = "Furniture Class";
                break;
            case 3:
                featureid = "109,71,65";
                this.objectname = "Object";
                this.objectmultiplename = "Objects"
                this.objectclassname = "Object Class";
                break;
            case 8://Electrical
                featureid = "113,92,89";
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectclassname = "Component Type";
                break;
            case 9://Fire and Safety
                featureid = "115,100,97";
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectclassname = "Component Type";
                break;
            case 10://Mechanical
                featureid = "229,130,127";
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectclassname = "Component Type";
                break;
            case 11://Plumbing
                featureid = "131,140,137";
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectclassname = "Component Type";
                break;
            case 12://Medical Gas
                featureid = "141,150,147";
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectclassname = "Component Type";
                break;
            case 20://Security System
                featureid = "151,228,225";
                this.objectname = "Equipment";
                this.objectmultiplename = "Equipment"
                this.objectclassname = "Equipment Type";
                break;
        }
        featureid = featureid + ",189";
        contextObj.objectService.getCustomerSubscribedFeaturesBarcode(featureid).subscribe(function (rt) {
            rt["Data"].find(function (item) {

                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                    case 62:
                    case 65:
                    case 68:
                    case 89:
                    case 97:
                    case 127:
                    case 137:
                    case 147:
                    case 163:
                    case 225:
                    case 167:
                         if (item["IsSubscribed"] == true) {
                             contextObj.IsClassPrefix = true;
                        }
                        break;
                        
                    case 189:
                        if (item["IsSubscribed"] == true) {
                            contextObj.isSiteAdmin = true;
                        }
                        break;
                }
                //if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 72) {
                //    contextObj.IsAutoNumbering = true;
                //}
            });
            if (contextObj.IsAutoNumbering == false && contextObj.IsClassPrefix) {
                var fieldValue = contextObj.fieldDetailsAdd.find(function (el) { return el.ReportFieldId == 651 && el.FieldId == 1985 })['FieldValue'];
                if (fieldValue != null) {
                    var lengthToTrimPrefix = fieldValue.length + 1;
                    var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 661 && el.FieldId == 2024 });
                    contextObj.fieldDetailsAdd[index].FieldValue = contextObj.fieldDetailsAdd[index].FieldValue.substring(lengthToTrimPrefix);
                }
            }
        });
        if (contextObj.target == "2" && contextObj.action =="add") {
            var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657 }); /*class*/
            if (contextObj.fieldDetailsAdd[index].FieldValue != null && contextObj.fieldDetailsAdd[index].FieldValue != "" && contextObj.fieldDetailsAdd[index].IsEnabled == false) {
                contextObj.onclasschange("", contextObj.target);
            }
        }
    }

    onSubmitData(event, Pagetarget) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add", Pagetarget);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit", Pagetarget);
                break;
        }
    }

    postSubmit(strsubmitField: string, target: string, pageTarget: string) {
        var contextObj = this;  
        this.selectedIddetails;
        var classid;
        var assetno;
        var assetnowithprefix;
        var statusid = "0";
        switch (contextObj.ObjectCategoryId) {
            case 2:
                statusid = "14";
                break;
            default:
                statusid = "10";
                break;
        }
       
        if (pageTarget == "2") {
            statusid = "9"
        } else  if (target == "edit") {
            if (this.selectedIddetails["rowData"].Status == "Assigned")
                statusid = "9"
        }
        var temparr = JSON.parse(strsubmitField);
        var barcode;
        var count =0
        temparr.find(function (item) {
            if (item.ReportFieldId == 4303) {   /*Barcode*/ 
                barcode = item.Value;
                count++;
            }
           else if (item.ReportFieldId == 657) {   /*class*/
                classid = item.Value;
                count++;
            }
           else if (item.ReportFieldId == 651) {   /*asset number without prefix*/
                if (item.FieldId== 1985) 
                 assetno = item.Value;
                count++;
            }
            if (count == 3)
                return true;

        });

        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(strsubmitField);
        assetnowithprefix = arr[3].Value +"-"+ arr[4].Value;
        arr.push({ ReportFieldId: 658, Value: contextObj.ObjectCategoryId.toString() });
        //if (contextObj.IsAutoNumbering == true)
        //    arr.push({ ReportFieldId: 661, Value: "" }); //tagnumber and asset number are same
        arr.push({ ReportFieldId: 662, Value: "" }); 
        arr.push({ ReportFieldId: 663, Value: "" }); 
        arr.push({ ReportFieldId: 664, Value: "" }); 
        arr.push({ ReportFieldId: 659, Value: statusid }); 
        arr.push({ ReportFieldId: 665, Value: contextObj.selectedSpaceId });//spaceId
        arr.push({ ReportFieldId: 666, Value: contextObj.xPosition }); //xpos
        arr.push({ ReportFieldId: 667, Value: contextObj.yPosition }); //ypos
        arr.push({ ReportFieldId: 668, Value: contextObj.objectAngle });//angle
        arr.push({ ReportFieldId: 669, Value: contextObj.drawingIds });//drawingId
        arr.push({ ReportFieldId: 2615, Value: contextObj.blockRefHandle });
        arr.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });//Module
        if (contextObj.IsAutoNumbering != true)
        {
            if (contextObj.IsClassPrefix == true)//To remove prefix if autonumbering not enabled
            {
                //arr[4].Value = arr[4].Value - arr[3].Value;
                var sub = arr[4].Value.substring(0, arr[3].Value.length+1);
                if (sub == arr[3].Value+'-')
                {
                    arr[4].Value = arr[4].Value.slice(sub.length, arr[4].Value.length);
                }
            }
        }

        contextObj.objectService.checkBarcodeExists(barcode).subscribe(function (result) {
            if (result["Data"] == 1 && contextObj.prevBarcode != barcode) {
                contextObj.notificationService.ShowToaster("Barcode already exists", 2);
            } else {
                contextObj.objectService.submitAddUpdateObjects(JSON.stringify(arr), contextObj.selectedId, target, contextObj.ObjectCategoryId, contextObj.dataOption, contextObj.attributeoption, classid, contextObj.drawingIds, '', 0, 0, 1, 1, false).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {                      
                        case 0:
                            contextObj.notificationService.ShowToaster(contextObj.objectname +" "+assetnowithprefix+" already exists", 2);
                            break;
                        case 1:
                            if (target == "add") {
                                var resultdata = JSON.parse(resultData["Data"].Data);
                                contextObj.notificationService.ShowToaster(resultdata[0][contextObj.objectclassname] + " " + resultdata[0][contextObj.objectname + " No."] + " added", 3);
                            } else {
                                contextObj.notificationService.ShowToaster(contextObj.objectname + " data updated", 3);
                            }
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                    }
                });
            }
        });        
    }

    onclasschange(event, pageTarget) {//pageTarget 1 From list 2 from Drawing
        var contextObj = this;
        var fieldid;
        var ClassId;
        var FieldLabel;
        var classListOption = 1;
        if (pageTarget == "2")
            classListOption = 3;
        if (event == "") {
            var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657 }); /*class*/
            fieldid = contextObj.fieldDetailsAdd[index].FieldId;
            ClassId = contextObj.fieldDetailsAdd[index].FieldValue;
            FieldLabel = contextObj.fieldDetailsAdd[index].FieldLabel;
            classListOption = 1;
        } else {
             fieldid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
             ClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
             FieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        }
        var Tagno;
        var siteFieldValue;
        if (fieldid == 1419) {
            this.objectService.getObjectClassSelectionLookups(this.ObjectCategoryId, '', 1, classListOption, 0).subscribe(function (resultData) {
                contextObj.tempdataforlist = JSON.parse(resultData.Data["FieldBinderData"]);
                contextObj.objectService.getObjectDataAddEditFieldsListforclass(contextObj.ObjectCategoryId, parseInt(ClassId), "add").subscribe(function (resultData) {
                    //if (SiteId == "2") {
                    //    siteFieldValue = contextObj.fieldDetailsAdd.find(function (el) { return el.ReportFieldId == 7411 }).FieldValue;
                    //}
                contextObj.fieldDetailsAdd = resultData["Data"];
                var count = 0;
                var withPrefix = false;
                var withoutPrefix = false;
                contextObj.fieldDetailsAdd.find(function (item: IField) {
                    switch (item.ReportFieldId) {
                        case 4303:   /*Barcode */
                            if (contextObj.IsBarcodeSubscribed == true) {
                                item.IsVisible = true;
                            }
                            else if (contextObj.IsBarcodeSubscribed == false) {
                                item.IsVisible = false;
                              
                            }
                            count++;
                            break;
                        case 651:
                           
                            if (item.FieldId == 1985) {//asset numner without prefix if autonumber subscription false
                                if (contextObj.IsAutoNumbering == false) {
                                    item.IsVisible = true;
                                 
                                    withoutPrefix = true;
                                    if (withPrefix == true)
                                        item.FieldValue = "";
                                } else { item.IsVisible = false; }
                              
                            }                            

                            if ( item.FieldId == 1605) {//asset numner with prefix
                                if (contextObj.IsAutoNumbering == false) {
                                    withPrefix = true;
                                    item.IsVisible = false;
                                    if (withoutPrefix == true)
                                        item.FieldValue = "";
                                }
                                else {
                                    if (contextObj.action == "add")
                                        item.IsVisible = false;
                                    else
                                    {
                                    item.IsVisible = true;
                                   }
                                }

                                    Tagno = item.FieldLabel;
                                    var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
                                    if (tagNoItem != undefined) {
                                       
                                        if (contextObj.IsAutoNumbering == true)
                                            tagNoItem.IsVisible = false;
                                        else
                                            tagNoItem.IsMandatory = true;
                                        tagNoItem.FieldLabel = Tagno;
                                    }
                              
                            }
                            count++;
                            break;
                        case 657:   /*class*/
                            item["LookupDetails"]["LookupValues"] = contextObj.tempdataforlist;//asset class
                            item.FieldValue = ClassId;// event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];//assetclass
                            item.FieldLabel = FieldLabel;
                            item.HasValidationError = false;
                            break;
                        case 7411:   /*site*/
                            if (contextObj.SiteId != undefined && contextObj.SiteId != null) {
                                item.FieldValue = contextObj.SiteId;
                                item.IsEnabled = false;
                            }                           
                                item.IsMandatory = true;
                            break;


                    }
                    if (count == 4) { return true; }
                    else return false;
                });
               // contextObj.fieldDetailsAdd[1].IsVisible = false;            
                  
                });
            })
            this.objectService.getObjectClassPrefix(0, ClassId).subscribe(function (resultData) {
                var item = contextObj.fieldDetailsAdd.find(function (el) { return el.FieldId == 1985 });
                var currentPrefix = item['Prefix'];                
                item.FieldValue = JSON.parse(resultData["FieldBinderData"])[0].NoPrefix
               
            });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}