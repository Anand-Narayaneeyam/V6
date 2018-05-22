import {Component, ChangeDetectorRef, Output, EventEmitter, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {DropDownListComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import {IField} from '../../../Framework/Models/Interface/Ifield'
import {ReviewWorkFlowService} from  '../../../models/common/reviewworkflow.service'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {LabelComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import {StringTextBoxComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component'
import {SubMenu} from '../../../framework/whatever/submenu/submenu.component'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component'
import {DrawingDetailsComponent} from '../drawingdetails/drawingdetails.component'
import {ReviewHistoryComponent} from './reviewhistory.component'
import {TextAreaComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/textareacomponent.component'
import {SortHelper} from '../../utils/sortHelper'

@Component({
    selector: 'reviewWorkFlow',
    templateUrl: 'app/Views/Common/Review/reviewWorkFlow.html',
    inputs: ['workflowCatId', 'entityCatId', 'selectedid'],
    directives: [DropDownListComponent, TextAreaComponent, ReviewHistoryComponent, DrawingDetailsComponent, FloorSelectionComponent, SplitViewComponent, SubMenu, GridComponent, FieldComponent, LabelComponent, StringTextBoxComponent],
    providers: [ReviewWorkFlowService, SortHelper]

})


export class ReviewWorkFlowComponent {
    workflowCatId: number;
    entityCatId: number;
    fieldaction: IField[];
    fieldsendto: IField[];
    itemsSource: any[];
    fieldObject: IField[];
    fieldtimespent: IField[];
    fieldrequestnumber: IField;
    fieldrequestby: IField[];
    fieldDetailsSpaceEdit: IField[];
    alignContent: string;
    description: string;
    details: string;
    selectedid: number;


    moduleId: number;
    pageTarget: number;


    splitviewReview: ISplitView = { secondaryArea: 60, showSecondaryView: false, showButton: false }
    reviewMenu: any[];
    enableSiteMenu = [0, 5, 6, 7, 8]
    siteTotalItems = 8;
    activemenu: number;

    fieldDescription: IField;
    fieldPreviousComments: IField;
    fieldComments: IField;


    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: "'single'" };


    constructor(private _reviewWorkFlowService: ReviewWorkFlowService, private _sortHelper: SortHelper) {

    }
    ngOnInit() {
        this.alignContent = "horizontal";
        if ((this.workflowCatId == 4) && (this.entityCatId == 5))
            this.getSubMenu(this.selectedid);

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["workflowCatId"] && changes["entityCatId"] && changes["workflowCatId"]["currentValue"] != changes["workflowCatId"]["previousValue"] && changes["entityCatId"]["currentValue"] != changes["entityCatId"]["previousValue"]) {
            //switch (this.workflowCatId) {
            //    case 1: {
            //        this.getRequestNumber(this.selectedid);
            //        this.getRequestBy(this.selectedid);
            //        this.getActionSection(this.selectedid);
            //        this.getTime(this.selectedid);
            //        this.getDescriptionData(this.selectedid);
            //        this.getRequestDetailsData(this.selectedid);
            //    } break;
            //    case 4: {
            //        debugger
            //        this.getActionSection(this.selectedid);
            //        this.getStackPlanData(this.selectedid);
            //        this.getRequestDetailsData(this.selectedid);
            //    } break;

            //}
            if ((this.workflowCatId == 4) && (this.entityCatId == 5)) {//space planning approval review 
                this.getActionSection(this.selectedid);
                this.getStackPlanData(this.selectedid);
                this.getRequestDetailsData(this.selectedid);
            }
            if (this.workflowCatId == 1) {
                this.getRequestNumber(this.selectedid);
                if (this.entityCatId != 3)
                    this.getRequestBy(this.selectedid);
                this.getActionSection(this.selectedid);
                this.getSubMenu(this.selectedid);
                this.getTime(this.selectedid);
                this.getDescriptionData(this.selectedid);
                this.getRequestDetailsData(this.selectedid);
            }
        }
    }
    public onSort(objGrid: any) {
        var sortedData = new Array();/*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;

    }
    //Request Section
    getRequestNumber(selectedid: number) {
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(resultData => console.log(this.fieldrequestnumber = resultData["requestnumberdetails"][0]));
    }
    getRequestBy(selectedid: number) {
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(resultData => console.log(this.fieldrequestby = resultData["requestnumberdetails"][1]));
    }
    //Action Section
    getActionSection(selectedid: number) {
        this._reviewWorkFlowService.getAction(this.workflowCatId, this.entityCatId, selectedid).subscribe(resultData => console.log(this.fieldaction = resultData["spaceplanningapprovalreview"][0]));
        this._reviewWorkFlowService.getAction(this.workflowCatId, this.entityCatId, selectedid).subscribe(resultData => console.log(this.fieldsendto = resultData["spaceplanningapprovalreview"][1]));

    }
    getTime(selectedid: number) {
        this._reviewWorkFlowService.getRequestNumberDetails(selectedid).subscribe(resultData => console.log(this.fieldtimespent = resultData["requestnumberdetails"][2]));
    }
    //Sub Menu Section
    getSubMenu(selectedid: number) {
        this._reviewWorkFlowService.getsubMenu(this.workflowCatId, this.entityCatId, selectedid).subscribe(resultData => this.reviewMenu = resultData["spaceplanningsubmenu"]);
    }
    //Description or Stack Plan section
    getDescriptionData(selectedid: number) {
        if (this.entityCatId != 3)
            this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(result => this.fieldDescription = result["descriptionData"][0])
        this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(result => this.fieldPreviousComments = result["descriptionData"][1])
        this._reviewWorkFlowService.getDescriptionData(selectedid).subscribe(result => this.fieldComments = result["descriptionData"][2])

    }
    getStackPlanData(selectedid: number) {
        this._reviewWorkFlowService.getStackPlans(selectedid).subscribe(resultData => this.fieldObject = resultData["stackplancolumn"]);
        this._reviewWorkFlowService.getStackPlans(selectedid).subscribe(resultData => this.itemsSource = resultData["stackplandata"]);
    }
    //Request details section
    getRequestDetailsData(selectedid: number) {
        this._reviewWorkFlowService.getRequestDetails().subscribe(resultData => this.fieldDetailsSpaceEdit = resultData["requestDetails"])
    }

    updateReviewMenu(event: any) {
        this.activemenu = event.value;
        this.splitviewReview.showSecondaryView = true;
        switch (event.value) {//select floor
            case 6:
                break;//select floor
            case 7: {//view floor
                this.moduleId = 3;
                this.pageTarget = 1;
            }
            case 0: {//history
            }
        }

    }
    doneClick(event: any) {
        console.log(event["selectedFloor"]);
        this.splitviewReview.showSecondaryView = false;
    }
    ClickEvent(event: any) {
        if (event == "cancel")
            this.splitviewReview.showSecondaryView = false;
    }

    getdescription() {
        if (this.workflowCatId == 4 && this.entityCatId == 5)
            this.description = "Stack Plans";
        if (this.workflowCatId == 1)
            this.description = "Description";
        return this.description;
    }

    getRequestDetails() {
        if (this.workflowCatId == 4 && this.entityCatId == 5)
            this.details = "Request Details";
        if (this.workflowCatId == 1) {
            this.details = "Request Details";
            if (this.entityCatId == 2 || this.entityCatId == 3)
                this.details = "Work Order Details";
            if (this.fieldrequestnumber) {
                if ((this.entityCatId == 2) || (this.entityCatId == 3)) {
                    this.fieldrequestnumber.FieldLabel = "Work Order Number";
                }
            }
        }
        return this.details;
    }

    submitClick() {
        console.log(this.fieldDetailsSpaceEdit + "  " + this.fieldaction)
    }

}