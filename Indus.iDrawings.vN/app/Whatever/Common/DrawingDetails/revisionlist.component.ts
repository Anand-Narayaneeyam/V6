import {Component, ChangeDetectorRef, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { AsbuiltService } from '../../../Models/Asbuilts/asbuilt.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({
    selector: 'revision-list',
    templateUrl: './app/Views/Common/DrawingDetails/revisionlist.component.html',
    styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
    directives: [SubMenu,  SplitViewComponent,Notification, ListComponent, FieldComponent, SlideComponent, GridComponent],
    providers: [HTTP_PROVIDERS, DrawingDetailsService, AsbuiltService, NotificationService, PagingComponent]

})
export class RevisionList implements OnInit {
    @Input() drawingId: number;
    @Input() revisionNo: number;
    @Input() drawingType: number;
    @Input() pageTarget: number;
    @Input() moduleId: number;
    sessionUserRoleId: any;
    itemsSource: any;
    fieldObject: IField;
    totalItems: any;
    public errorMessage: string;
    selIds = new Array();
    datakey: string;
   // cardButtonPrivilege = [true, false];
    siteDrawing: number = 999;
    buildingDrawing: number = 0;
    floorDrawing: number = 1;
    success: string = "";
    position = "top-right";
    showSlide: boolean = false;
    @Output() onmarkupCardClick = new EventEmitter();
    @Output() onViewDwgClick = new EventEmitter();
    @Output() onRevisionCountChange = new EventEmitter();
    privilegeIds: any[];
    pageTitle: string = "Revisions";
    fieldDetailsAdd: IField[];
    dataKey: string = "Revision No."; 
    inputItems: IGrid = { dataKey: "Revision No.", groupBy: [], grpWithCheckBx: false, selectioMode:"single", selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '' };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    public itemsPerPage: number = 0;
    action: string;
    btnName: string;
    menuData = [
        {
            "id": 0,
            "title": "Edit Description",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id":1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id": 2,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null,
            "privilegeId": null
        }
    ];
   enableMenu = [];
    constructor(private asbuiltService: AsbuiltService,private administrationService: AdministrationService, private drawingDetailsService: DrawingDetailsService, private notificationService: NotificationService, private generalFunctions: GeneralFunctions) {
      ;
      }
    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:           
                this.editClick();
                break;
            case 1:
                this.deleteRevision();
                break;
            case 2:
                this.viewDwg();
                break;
        }
    }
    public editClick() {      
        var contextObj = this;
        this.pageTitle = "Edit Drawing Description";
        contextObj.action = "add";
        contextObj.btnName = "Save Changes";  
        contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
     
        if (contextObj.drawingType == 0)
            contextObj.drawingDetailsService.getEditBuildingDrawingFieldDetails(135, contextObj.inputItems.selectedIds[0], 58, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
            resultData["Data"] = contextObj.setBuildingFieldDetails(resultData["Data"]);
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.dataKey = contextObj.fieldDetailsAdd[0].FieldLabel;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;  
            });
        else
            contextObj.drawingDetailsService.getEditFloorDrawingFieldDetails(136, contextObj.inputItems.selectedIds[0], 64, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
            resultData["Data"] = contextObj.setFloorFieldDetails(resultData["Data"]);
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.dataKey = contextObj.fieldDetailsAdd[0].FieldLabel;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }
    ngOnInit(): void {   
        var contextObj = this;     
        switch (contextObj.drawingType) {
            case contextObj.buildingDrawing: contextObj.datakey = "Revision No.";
                break;
            case contextObj.floorDrawing: contextObj.datakey = "Revision No.";
                break;
           
        }
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];      
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });  
        contextObj.drawingDetailsService.getRevisionDetailsFields(contextObj.drawingType).subscribe(function (resultData) {
         
            if (contextObj.drawingType == 1)
                contextObj.fieldObject = contextObj.setFieldDisabled(resultData["Data"]);//edit enabling for file name
            else contextObj.fieldObject = resultData["Data"];
          
        });
        contextObj.dataload();
        //Previliage
        let i = 0;
        contextObj.privilegeIds = [217, 218, 219];
            this.menuData = contextObj.menuData.filter(function (el) {
                el.privilegeId = contextObj.privilegeIds[i];
                i = i + 1;
                return true
            });
            var callBack = function (data) {
                if (contextObj.pageTarget != 1) {//enable asbuilt->setup-> revision                
                    if (data != undefined && data.length != 0) {

                        data.filter(function (el) {
                            if (el.title == "Edit") {
                                contextObj.enableMenu.push[0];
                            }
                            else if (el.title == "Delete") {
                                contextObj.enableMenu.push[1];
                            }

                        });
                    }
                    contextObj.enableMenu.push[2];
                }

                if (contextObj.sessionUserRoleId > 3) {

                    contextObj.enableMenu = [2];
                }
                contextObj.menuData = data;            };
            contextObj.generalFunctions.GetPrivilegesOfPage(this.menuData, callBack, 62, this.administrationService, this.menuData.length);
       
    }
    public deleteRevision() {
      
        if (this.inputItems.selectedIds[0].length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }else  if (this.inputItems.selectedIds.length==1) {
            this.showSlide = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Revision", 2);
        }
    }
    onDelete(e: Event) {
        if (this.inputItems.selectedIds[0].length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.deleteRevision();
        }
    }
    dataload() {
        var contextObj = this;
        contextObj.drawingDetailsService.getRevisionsData(contextObj.drawingType, contextObj.drawingId, -1, 0, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {

            debugger
            if (resultData["Data"] == "[]") {
                resultData["Data"] = null;
            }
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            console.log("total", contextObj.totalItems);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;

        });  
    }
    onCardClick(event: Event) {
        //console.log("cardClick");        
        this.onmarkupCardClick.emit(event);
    }
    onSubmit(event: any) {
     
        var contextObj = this;
        var items;
        var count = 0
      
        let updateValue;// JSON.stringify(JSON.parse(event.fieldobject)[2])
        let revisionNoObj;// = JSON.stringify(JSON.parse(event.fieldobject)[1])
        var singlecheck = JSON.parse(event.fieldobject).filter(function (item) {

            if (item.ReportFieldId == 4382 || item.ReportFieldId == 516 ) {//description
                updateValue = item;
                count++;
            }
            if (item.ReportFieldId == 4377 || item.ReportFieldId == 511 ) {
                revisionNoObj=item
               // items.push({ ReportFieldId: 4377, Value: item.FieldValue });
                count++;
            }
            if (count == 2)
                return true;
            else return false;

        });
        // let selectId: number = event["dataKeyValue"];
        this.drawingDetailsService.updateRevisionDescription(this.drawingId, JSON.stringify(updateValue), contextObj.drawingType, revisionNoObj.Value, JSON.stringify(revisionNoObj)).subscribe(function (resultData) {
             //   if (this.getData.checkForUnhandledErrors(resultData)) {
          
            contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        var datakey = contextObj.inputItems.dataKey;
                        for (let i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == contextObj.inputItems.selectedIds[0]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0];
                                var updatedData = new Array();/*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                            }
                        }
                        contextObj.notificationService.ShowToaster("Drawing description updated", 3);
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
               // }
            });
     
    }
    setBuildingFieldDetails(jsonobject: any) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 489
                    || jsonobject[i]["ReportFieldId"] == 473
                    || jsonobject[i]["ReportFieldId"] == 4304
                    || jsonobject[i]["ReportFieldId"] == 474 || jsonobject[i]["ReportFieldId"] == 4378 || jsonobject[i]["ReportFieldId"] == 4377) {
                    jsonobject[i]["IsEnabled"] = true;
                    jsonobject[i]["ReadOnlyMode"] = true;
                    jsonobject[i]["IsMandatory"] = false;
                }
            }

        
              
           
            return jsonobject;
        }
    }
    setFloorFieldDetails(jsonobject: any) {
        var contextObj = this;
        for (let i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i]["ReportFieldId"] == 489
                || jsonobject[i]["ReportFieldId"] == 473
                || jsonobject[i]["ReportFieldId"] == 523
                || jsonobject[i]["ReportFieldId"] == 524
                || jsonobject[i]["ReportFieldId"] == 525
                || jsonobject[i]["ReportFieldId"] == 511) {
                jsonobject[i]["IsEnabled"] = true;
                jsonobject[i]["ReadOnlyMode"] = true;
                jsonobject[i]["IsMandatory"] = false;

            }
            else if (jsonobject[i]["ReportFieldId"] == 512) {
                jsonobject[i]["IsEnabled"] = true;
                jsonobject[i]["ReadOnlyMode"] = true;
                jsonobject[i]["IsMandatory"] = false;
                jsonobject[i]["DataEntryControlId"] = "1";
            }
        }
        return jsonobject;
    }
    okDeleteClick(event: any) {
        
    //  //  //console.log("Yes");
  // debugger
        var contextObj = this;
        this.showSlide = false;
        contextObj.revisionNo =contextObj.inputItems.selectedIds[0];
        this.drawingDetailsService.postRevisionDelete(this.drawingId, contextObj.revisionNo, this.drawingType).subscribe(function (resultData) {
        
            contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {                 
                    let retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                   
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = contextObj.itemsSource.length;
                    contextObj.notificationService.ShowToaster("Revision deleted", 3);
                    if (contextObj.itemsSource.length == 0)
                        contextObj.enableMenu = [];
                   // contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                   //// for (var j = 0; j < contextObj.selIds.length; j++) {
                   // var index = contextObj.itemsSource.indexOf(contextObj.itemsSource.filter(x => x[contextObj.datakey] == contextObj.revisionNo)[0]);
                   //     if (index > -1)
                   //         contextObj.itemsSource.splice(index, 1);
                   //// }
                  //  contextObj.notificationService.ShowToaster("Drawing deleted", 3);
                   // debugger             
                    contextObj.onRevisionCountChange.emit({
                        revisions: contextObj.itemsSource.length, drawingId: contextObj.drawingId
                    });

                }
                else {
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
       
        });
    }
    cancelClick(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    viewDwg() {
        this.revisionNo = this.inputItems.rowData["Revision No."];
        this.onViewDwgClick.emit({
            latestRevisionNo: this.revisionNo, drawingId: this.drawingId, rowData: this.inputItems.rowData
        });
    }
    setFieldDisabled(jsonobject: any) {

        var contextObj = this;
        if (jsonobject) {
            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 512) {
                    jsonobject[i]["IsEnabled"] = false;              
                }
            }
        }
        return jsonobject;

    }
    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataload(); 
    }
    public RowUpdate(event: any) {

    }
    public RowDelete(event: any) {
    }
    public pageChanged(event: any) {
        var contextObj = this;
        contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
        contextObj.drawingDetailsService.getRevisionsData(contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {

            if (resultData["Data"] == "[]") {
                resultData["Data"] = null;
            }
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            //console.log("data", contextObj.cardSource);

        });
    }
}