import {Component, ChangeDetectorRef, EventEmitter, Output, Input, OnInit, SimpleChange, OnChanges} from '@angular/core';
import {NgControl} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import {FieldComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/fieldgeneration.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
//import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({
    selector: 'markup-list',
    templateUrl: 'app/Views/Common/DrawingDetails/markuplist.component.html',
    styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
    directives: [PageComponent, PagingComponent, GridComponent, Notification, ListComponent, FieldComponent, ConfirmationComponent, SlideComponent, SubMenu, SplitViewComponent],
    providers: [HTTP_PROVIDERS, DrawingDetailsService, NotificationService, ConfirmationService, GeneralFunctions],
})
export class MarkupsList implements OnInit, OnChanges{
    @Input() drawingId: number;
    @Input() revisionNo: number;
    @Input() drawingType: number;
    @Input() pageTarget: number;
    @Input() visibleMarkupIds: number[];
    //cardSource: any;
    itemSource: any;
    //cardFields: IField;
    fieldObj: IField;
    totalItems: any;
    itemsPerPage: any;
    public errorMessage: string;
    //selIds = new Array();
    datakey: string;
    privilegeIds: any[];
    siteDrawing: number = 999;
    buildingDrawing: number = 0;
    floorDrawing: number = 1;
    success: string = "";
    position = "top-right";
    sessionUserId: any;
    sessionUserRoleId: any;
    showSlide: boolean = false;
    @Output() onmarkupCardClick = new EventEmitter();
    @Output() onViewmarkupClick = new EventEmitter();
    @Output() onDeletemarkupClick = new EventEmitter();
    cardButtonPrivilege = [true, true];
    inputItems: IGrid = { dataKey: "MarkupId", isHeaderCheckBx: true, allowSort: true, selectedIds: [], allowAdd: false, sortCol: "[Uploaded On]", sortDir:"ASC" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    enableMenu = [];
    public fieldDetailsForEdit: IField[];
    isBuildingMarkup: boolean;
    markupViewList: MarkupView[] = [];
    selectedId: number;
    selectedmarkupslength: number = 0;
    @Output() onMarkupCountChange = new EventEmitter();
    @Output() onEditViewmarkupClick = new EventEmitter();
    
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
            "id": 1,
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
    constructor(private administrationService: AdministrationService, private drawingDetailsService: DrawingDetailsService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private genFuns: GeneralFunctions) {
    }

    ngOnInit(): void {

        var contextObj = this;
        console.log("drawingType", this.drawingType);
        switch (this.drawingType) {
            case this.buildingDrawing: this.isBuildingMarkup = true;
                //this.datakey = "MarkupId";
                break;
            case this.floorDrawing: this.isBuildingMarkup = false;
                //this.datakey = "MarkupId";
                break;
            //case this.siteDrawing: 
            //    break;
        }
        this.drawingDetailsService.getMarkupsDetailsFields(contextObj.drawingType).subscribe(function (resultData) {
            contextObj.fieldObj = resultData["Data"];
            if (contextObj.pageTarget == 1) {
                contextObj.fieldObj[0].IsVisible = false;
                contextObj.inputItems.isHeaderCheckBx = false;
                contextObj.inputItems.selectioMode = "single";
            } else {
                contextObj.selectedmarkupslength = contextObj.visibleMarkupIds.length;
                //contextObj.menuData.push({
                //    "id": 3,
                //    "title": "Edit In Drawing",
                //    "image": "Edit In Drawing",
                //    "path": "Edit In Drawing",
                //    "submenu": null,
                //    "privilegeId": null
                //} );
               // contextObj.inputItems.selectioMode = "none"
            }
                console.log("MARKUPCARDFIELD", contextObj.fieldObj);
        });

        contextObj.dataLoad();

      
        this.administrationService.getSessionData().subscribe(function (data) {
       
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });  

      
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["visibleMarkupIds"] && changes["visibleMarkupIds"]["currentValue"]) {
            this.selectedmarkupslength = this.visibleMarkupIds.length;
        }
    }
    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3 && this.pageTarget==1) {
                  
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                   
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.onEdit();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                }
                else contextObj.onEdit();
                break;
            case 1:
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3 && this.pageTarget==1) {

                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });

                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.deleteMarkup();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to delete the data of the selected markup", 2);
                    }
                }
                else contextObj.deleteMarkup();

              
                break;
            case 2:
                contextObj.viewMarkup(false);
                break;
            case 3: var AddedBy = "";
                if (this.sessionUserRoleId >= 3) {
                    contextObj.itemSource.find(function (el) {if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.viewMarkup(true);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                }
                else
                    contextObj.viewMarkup(true);
                break;
        }
    }
    dataLoad() {
        var contextObj = this;
        this.drawingDetailsService.getMarkupsDetailsData(contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultDataSource) {

            if (resultDataSource["Data"] == "[]") {
                resultDataSource["Data"] = null;
            }
            contextObj.itemSource = JSON.parse(resultDataSource["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultDataSource["Data"]["DataCount"]);
            contextObj.itemsPerPage = resultDataSource["Data"].RowsPerPage;
            console.log("MARKUPCARD", contextObj.totalItems);
            if (contextObj.itemSource.length == 0) {
                contextObj.notificationService.ShowToaster("No Markups exist", 2);
            }

            else {
                contextObj.enableMenu = [0, 1, 2, 3];
                if (contextObj.visibleMarkupIds != undefined) {
                    if (contextObj.visibleMarkupIds.length > 0) {
                        for (let i = 0; i < contextObj.visibleMarkupIds.length; i++) {
                            var visibleMarkupId = contextObj.visibleMarkupIds[i];
                            var index = contextObj.itemSource.findIndex(function (el) { return el['MarkupId'] === visibleMarkupId });
                            if (index != -1) {
                                contextObj.itemSource[index]["Select All"] = true;
                            }
                        }
                    }
                }
            }
        });
    }
    deleteMarkup() {
        if (this.pageTarget == 1) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else if (this.inputItems.selectedIds.length == 1) {
                this.showSlide = true;
            }
            else {
                this.notificationService.ShowToaster("Select a Markup", 2);
            }
        }
        else {
            var isCheck = this.checkBoxEnableCheck(2);

        }
          
    }
    checkBoxEnableCheck(target:number) {
        var isCheck: number[] = [];
        for (let i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i]["Select All"] == true) {
                isCheck.push(this.itemSource[i]['MarkupId']);
            }
        }
        if (isCheck.length > 1)
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        else if (isCheck.length == 1) {
            var contextObj = this;
            if (target == 3) {
                return true;
            } else {
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3) {
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == isCheck[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.selectedId = isCheck[0];
                        if (target == 1) {
                            contextObj.drawingDetailsService.loadMarkupDesEdit(isCheck[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                                contextObj.fieldDetailsForEdit = result["Data"];
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }
                        else if (target == 2)
                            this.showSlide = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                } else {
                    contextObj.selectedId = isCheck[0];
                    if (target == 1) {
                        contextObj.drawingDetailsService.loadMarkupDesEdit(isCheck[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                            contextObj.fieldDetailsForEdit = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else if (target == 2)
                        this.showSlide = true;
                }
            }
        }
        else
            this.notificationService.ShowToaster("Select a Markup", 2);
    }
    onEdit() {
        this.pageTitle = "Edit Markup Description";
        if (this.pageTarget == 1)
            this.editClick();
        else {
            this.checkBoxEnableCheck(1);
        }
    }
    editClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.drawingDetailsService.loadMarkupDesEdit(contextObj.inputItems.selectedIds[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                contextObj.fieldDetailsForEdit = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        } 
    }
    onSort(event) {
        debugger
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    }
 
    onSubmitData(event: any) {
        var contextObj = this;
        let updateValue;// JSON.stringify(JSON.parse(event.fieldobject)[2])
        let revisionNoObj;// = JSON.stringify(JSON.parse(event.fieldobject)[1])
        var singlecheck = JSON.parse(event.fieldobject).filter(function (item) {

            if (item.ReportFieldId == 4393 || item.ReportFieldId == 555) {//description
                updateValue = item;
                return true;
            }
            else return false;
           

        });
        var selectedMarkupId;
        if (this.pageTarget == 1)
            selectedMarkupId = this.inputItems.selectedIds[0];
        else
            selectedMarkupId = this.selectedId;
        var description = updateValue['Value'];
        this.drawingDetailsService.updateMarkupDescription(JSON.stringify(updateValue), selectedMarkupId, contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
                    contextObj.success = resultData.Message;
                    if (contextObj.success == "Success") {                     
                        var datakey = contextObj.inputItems.dataKey;
                        for (let i = 0; i < contextObj.itemSource.length; i++) {
                            if (contextObj.itemSource[i][datakey] == selectedMarkupId) {
                                contextObj.itemSource[i]['Description'] = description;
                                var updatedData = new Array();/*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemSource);
                                contextObj.itemSource = updatedData;
                            }
                        }
                        contextObj.notificationService.ShowToaster("Markup description updated", 3);
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
            });
      
    }

    deleteMarkupFromListYesClick(event: any) {
        console.log("Yes");
        this.showSlide = false;
        var contextObj = this;
        var markupId: number[]=[];
        if (this.pageTarget == 1)
            markupId.push(this.inputItems.selectedIds[0]);
        else
            markupId.push(this.selectedId);
        
        this.drawingDetailsService.postMarkupDelete(markupId[0], this.drawingId, this.revisionNo ,this.drawingType).subscribe(function (resultData) {
                contextObj.success = resultData.Message;
                if (contextObj.success == "Success") {
                    let retUpdatedSrc = contextObj.genFuns.updateDataSource(contextObj.itemSource, "delete", '', markupId, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems == 0)
                        contextObj.enableMenu = [];
                    contextObj.notificationService.ShowToaster("Markup file deleted", 3);             
                    contextObj.onMarkupCountChange.emit({
                        markups: contextObj.itemSource.length, drawingId: contextObj.drawingId, revisionNo: contextObj.revisionNo

                    });
                    contextObj.onDeletemarkupClick.emit(markupId[0]);

                }
                else {
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
    }
    deleteMarkupFromListNoClick(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    viewMarkup(fromEdit: boolean) {
        debugger
        this.selectedmarkupslength = 0;
        var contextObj = this;
        contextObj.markupViewList = [];
        if (this.pageTarget == 1) {
            this.markupViewList.push({ markupId: this.inputItems.selectedIds[0], isView: true })
        } else {
            for (let i = 0; i < this.itemSource.length; i++) {
                if (this.itemSource[i]["Select All"] == true) {
                    this.markupViewList.push({ markupId: this.itemSource[i]['MarkupId'], isView: true })
                    this.selectedmarkupslength++;
                }
                else {
                    this.markupViewList.push({ markupId: this.itemSource[i]['MarkupId'], isView: false })
                }

            }
        }
        if (this.pageTarget == 1) {
            this.onViewmarkupClick.emit(contextObj.markupViewList);
        }
        else {
            debugger
            if (fromEdit) {
                if (this.selectedmarkupslength == 1) {
                    var index = contextObj.markupViewList.findIndex(function (el) { return el.isView == true });
                    var data = contextObj.markupViewList[index];
                    contextObj.markupViewList = [];
                    contextObj.markupViewList.push(data);
                    this.onEditViewmarkupClick.emit(contextObj.markupViewList);
                } else if (this.selectedmarkupslength > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.notificationService.ShowToaster("Select a Markup", 2);
            }
            else {
                if (this.selectedmarkupslength == 0) {
                    this.notificationService.ShowToaster("Select a Markup", 2);
                } else {
                    this.onViewmarkupClick.emit(contextObj.markupViewList);
                }
            }
        }
    }
    editMarkupInDrawing() {
        if (this.checkBoxEnableCheck(3))
            this.viewMarkup(true);
    }
}
export interface MarkupView {
    markupId: number;
    isView: boolean;
}