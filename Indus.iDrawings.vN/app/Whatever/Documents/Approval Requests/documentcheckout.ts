import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DocumentService} from '../../../Models/Documents/documents.service'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component';
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { CommonService } from '../../../models/common/common.service';
import { DocumentCheckoutReviewComponent} from './documentcheckoutreview';

@Component({
    selector: 'documentcheckout',
    templateUrl: './app/Views/Documents/Approval Requests/documentcheckout.html',
    directives: [PageComponent, SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, searchBox, ConfirmationComponent, SlideComponent, DisplaySettingsComponent, TabsComponent, TabComponent, DocumentCheckoutReviewComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions, DocumentService, CommonService]
})

export class DocumentCheckoutComponent {

    fieldDetailsAdd1: IField[];
    pagePath ="Documents / Approval Requests / Document Check Out";//"Documents / Checkout Requests for Approval";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    pageTitle: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    itemsSource: any[];
    pageIndex: number = 0;
    selectedTab: number = 0;
    isTabOpen = false;
    localselection: number;
    deleteIndex: number;
    Permissions: any[] = [];
    inputItems: IGrid = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false,selectioMode:"single" };
    fieldObject: IField[];
    fieldDetailsCheckout: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Review Request",
            "image": "Review",
            "path": "Review",
            "submenu": null,
            "privilegeId": null
        }]

    enableMenu = [];

    constructor(private documentService: DocumentService, private notificationService: NotificationService, private generFun: GeneralFunctions,
        private commonService: CommonService, private administrationService: AdministrationService) {
        var contextObj = this;
        documentService.getDocumentCheckoutListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        })
        this.dataLoad();
    }

    dataLoad() {
        var contextObj = this;
        this.documentService.getWorkFlowReviewRequestList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;

            if (contextObj.totalItems > 0)
            {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No Approval Requests exist", 2);
                contextObj.enableMenu = [];
            }
        })
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push(
            {
                ReportFieldId: 5859,
                Value: this.inputItems.rowData["WorkflowEntityId"]
            },
            {
                ReportFieldId: 964,
                Value: this.inputItems.selectedIds[0]
            }
        );
        var strLookupRptFields: any[] = [];
        strLookupRptFields.push(
            {
                FieldId: 2952,
                ReportFieldId: 6553,
                Value: 7
            },
            {
                FieldId: 2952,
                ReportFieldId: 5826,
                Value: 1
            }
        );
        var workflowactionpointid: any,
            WorkTypeId: any;
        if (contextObj.inputItems && contextObj.inputItems.selectedIds && contextObj.inputItems.selectedIds.length == 1) {
            workflowactionpointid = contextObj.inputItems.rowData["WorkFlowActionPointId"];
            WorkTypeId = contextObj.inputItems.rowData["WorkTypeId"];
            if (workflowactionpointid) {
                strLookupRptFields.push(
                    {
                        FieldId: 2952,
                        ReportFieldId: 5827,
                        Value: workflowactionpointid
                    });
            }
            if (WorkTypeId) {
                strLookupRptFields.push(
                    {
                        FieldId: 2952,
                        ReportFieldId: 5832,
                        Value: WorkTypeId
                    });
            }
        }
        this.documentService.getDocumentCheckoutReviewFields(JSON.stringify(arrayList), JSON.stringify(strLookupRptFields)).subscribe(function (result) {
            contextObj.fieldDetailsCheckout = result["Data"];

            for (let i = 0; i < contextObj.fieldDetailsCheckout.length; i++) {
                if (contextObj.fieldDetailsCheckout[i].FieldId == 2952)
                    contextObj.fieldDetailsCheckout[i].IsMandatory = true;
                else
                    contextObj.fieldDetailsCheckout[i].IsMandatory = false;


                if (contextObj.fieldDetailsCheckout[i].FieldId != 1260 && contextObj.fieldDetailsCheckout[i].FieldId != 2309
                    && contextObj.fieldDetailsCheckout[i].FieldId != 2952
                    && contextObj.fieldDetailsCheckout[i].FieldId != 3108) { // Subject & Review comments & Action
                    contextObj.fieldDetailsCheckout[i].IsEnabled = false;
                    contextObj.fieldDetailsCheckout[i].DataEntryControlId = 1;
                }
                if (contextObj.fieldDetailsCheckout[i].FieldId == 2952) {
                    contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues = contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues.filter(function (el) {
                        return el.Value != "Timed Out";
                    })
                }
                if (contextObj.fieldDetailsCheckout[i].FieldId == 3108)
                {
                    var lookupvalue: any[] = [];
                    lookupvalue.push({ Id: WorkTypeId, IsDisabled: false, Value: contextObj.inputItems.rowData["Work Type"] });
                    contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues = lookupvalue;
                    contextObj.fieldDetailsCheckout[i].FieldValue = WorkTypeId.toString();
                }

            }
            contextObj.getEditPermitDetails();
        })
        this.localselection = 1;
        contextObj.isTabOpen = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);

    }
    public getEditPermitDetails() {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5825,
                Value: contextObj.inputItems.rowData["WorkFlowActionPointId"]
            }
        );
        contextObj.documentService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {            
            var fieldpermission = JSON.parse(permission["Data"]);
            if (fieldpermission && fieldpermission.length>0)
            {
                var length = fieldpermission.length;
                for (let i = 0; i < length; i++)
                {
                    if (fieldpermission[i]["EntityCategoryId"] == 7 && fieldpermission[i]["Has Permission"]==1)
                        contextObj.Permissions.push({ Id: fieldpermission[i]["Id"], Name: fieldpermission[i]["Name"] })
                }                
            }
            contextObj.getEditableFields();
        });
    }

    public getEditableFields() {

        var check
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5827,
                Value: contextObj.inputItems.rowData["WorkFlowActionPointId"]
            }
        );
        contextObj.documentService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {

            var editableFields: any[] = JSON.parse(resultData["Data"]);
            var reportFields: any[] = [];

            for (var item of contextObj.fieldDetailsCheckout) {
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && (fieldItem.EntityCategoryId == 7)) {
                        check = true;
                        return true
                    }
                    else {
                        check = false
                        return false;
                    }
                    //return (fieldItem.ReportFieldId === item.ReportFieldId) && contextObj.entityCategoryId === fieldIte
                });
                if (check) {  /*EntityCategoryId will be '1' here for both SR and NPM WO*/
                    item.IsVisible = editableObject.Visible;
                    item.ReadOnlyMode = !editableObject.Editable;
                    item.IsEnabled = editableObject.Editable;
                    if (item.IsVisible) reportFields.push(item.ReportFieldId);  /*Pushes the fields which are not editable to a temp array for removing*/
                }
            }

            for (var index = 0; index < contextObj.fieldDetailsCheckout.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsCheckout[index].ReportFieldId) == -1) && contextObj.fieldDetailsCheckout[index].ReportFieldId > 1000000) {
                    contextObj.fieldDetailsCheckout.splice(index, 1);       /*Removes the additional data fields which are not editable*/
                    index -= 1;
                }
            }
        });
    }



    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    }

    onTabClose(event: any) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
        /*contextObj.dataLoad();*/
    }

    reviewSubmitBack(event) {
        if (event["Status"] == "Success") {
            this.selectedTab = 0;
            this.isTabOpen = false;           
            this.dataLoad();
        }
    }
    onSort(event: any) {
        this.dataLoad();
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}